import express, { response } from "express";
import session, { MemoryStore } from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";

import { generateHexTiles } from "./tileGenerator.js";
import { register, login } from "./Auth.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, // allow cookies
    })
);

let redisClient = createClient({
    url: "redis://redis:6379",
});
redisClient.connect().catch((error) => {
    console.log("There is an error with redis!");
    console.error(error);
});

// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
});

app.use(express.json());

function genuuid() {
    return uuidv4();
}

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        genid: function (req) {
            return genuuid();
        },
        secret: "mysecretkey", // change to a strong secret in production
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // set to true in production with HTTPS
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24, // 24 hour
        },
    })
);

app.post("/api/register", async (req, res) => {
    const registerStatus = await register(req.body);
    if (registerStatus === "Success") {
        res.status(200).json({ message: "Registered successfully" });
        console.log("Success");
    } else {
        res.status(400).json({ message: `${registerStatus}` });
        console.log(registerStatus);
    }
});

app.post("/api/login", async (req, res) => {
    const loginStatus = await login(req.body);

    if (loginStatus.status === "Success") {
        console.log("Success");
        req.session.user = {
            userId: loginStatus.userId,
            username: loginStatus.username,
            boardGenerated: false,
        };
        console.log(req.session);
        res.status(200);
        res.json({ message: "Login successfully" });
    } else {
        res.status(400);
        res.json({ message: `${loginStatus}` });
        console.log(loginStatus);
    }
});

app.post("/api/logout", async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
        res.json({ isLoggedIn: false, user: null });
        console.log("Session deleted");
    } else {
        res.json({ isLoggedIn: false, user: null });
    }
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend" });
});

app.post("/api/generateHexTiles", async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.session.user) {
            console.log("No user logged in!");
            return res
                .status(401)
                .json({ error: "Unauthorized: Please log in first." });
        }

        const redisKey = `tiles:${req.sessionID}`;
        let tiles;

        // If board is already generated
        if (req.session.user.boardGenerated) {
            console.log("Board is already generated");

            try {
                // Try to get tiles from Redis
                tiles = await redisClient.get(redisKey);
                if (tiles) {
                    tiles = JSON.parse(tiles);
                } else {
                    console.warn("Tiles not found in Redis, regenerating...");
                    tiles = regenerateTiles(req.body.rowLengths || 24);
                }
            } catch (redisError) {
                console.error("Redis GET error:", redisError);
                // Fallback: regenerate tiles
                tiles = regenerateTiles(req.body.rowLengths || 24);
            }

            return res.json(tiles);
        }

        // If board is not yet generated
        console.log("Tiles request");
        tiles = generateHexTiles(req.body.rowLengths || 24);

        req.session.user.boardGenerated = true;

        try {
            await redisClient.set(redisKey, JSON.stringify(tiles));
            console.log("Tiles saved to Redis");
        } catch (redisError) {
            console.error("Redis SET error:", redisError);
            // Fallback: continue without Redis
        }

        res.json(tiles);
    } catch (error) {
        console.error("Error in /api/generateHexTiles:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Helper in case Redis fails and tiles need regeneration
function regenerateTiles(size) {
    console.log("Regenerating tiles without Redis");
    return generateHexTiles(size);
}

app.post("/api/makeMove", async (req, res) => {
    const tileId = req.body.tileId;
    const roadId = req.body.roadId;
    const playerId = req.session.user.userId;
    console.log(playerId);
    const msg = `"Road build on tile id: ", ${tileId}, " and road id: ", ${roadId}`;

    const redisKey = `building:${req.sessionID}`;

    let moves = await redisClient.get(redisKey);

    moves = moves ? JSON.parse(moves) : [];
    const move = {
        tileId: tileId,
        roadId: roadId,
        playerId: playerId,
    };

    if (move.tileId && move.roadId) {
        moves.push(move);
    }

    await redisClient.set(redisKey, JSON.stringify(moves));
    console.log(msg);
    res.json(msg);
});

// backend
app.get("/api/check-auth", (req, res) => {
    console.log(req.session);
    if (req.session.user) {
        res.json({ isLoggedIn: true, user: req.session.user });
    } else {
        res.json({ isLoggedIn: false });
    }
});

const PORT = 5000;
app.listen(PORT, () =>
    console.log(`Backend running on http://localhost:${PORT}`)
);
