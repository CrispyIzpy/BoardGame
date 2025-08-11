import express, { response } from "express";
import session from "express-session";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

import { generateHexTiles } from "./tileGenerator.js";
import { register, login } from "./Auth.js";

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, // allow cookies
    })
);
app.use(express.json());

function genuuid() {
    return uuidv4();
}

app.use(
    session({
        genid: function (req) {
            return genuuid();
        },
        secret: "mysecretkey", // change to a strong secret in production
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // set to true in production with HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60, // 1 hour
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
        res.status(200);
        res.json({ message: "Login successfully" });
        console.log("Success");
        req.session.user = {
            userId: loginStatus.userId,
            username: loginStatus.username,
        };
        console.log(req.session);
    } else {
        res.status(400);
        res.json({ message: `${loginStatus}` });
        console.log(loginStatus);
    }
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend" });
});

app.post("/api/generateHexTiles", (req, res) => {
    console.log("Tiles request");
    const size = req.body.rowLengths || 24;
    const tiles = generateHexTiles(size);
    res.json(tiles);
});

app.post("/api/makeMove", (req, res) => {
    const tileId = req.body.tileId;
    const roadId = req.body.roadId;
    const msg = `"Road build on tile id: ", ${tileId}, " and road id: ", ${roadId}`;
    console.log(msg);
    res.json(msg);
});

// backend
app.get("/api/check-auth", (req, res) => {
    if (req.session.user) {
        console.log(req.session);
        res.json({ isLoggedIn: true, user: req.session.user });
    } else {
        res.json({ isLoggedIn: false });
    }
});

const PORT = 5000;
app.listen(PORT, () =>
    console.log(`Backend running on http://localhost:${PORT}`)
);
