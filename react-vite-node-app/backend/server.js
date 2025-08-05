import express from "express";
import session from "express-session";
import cors from "cors";

import generateHexTiles from "./tileGenerator.js";
import testConnection from "./Auth.js";

const app = express();
app.use(
    cors({
        credentials: true, // allow cookies
    })
);
app.use(express.json());

app.use(
    session({
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

app.post("/api/register", (req, res) => {
    testConnection();
    console.log("Register");
    console.log(req.body);
    res.status(200);
    res.json({ message: "Registered successfully" });
});

app.post("/api/login", (req, res) => {
    console.log("Login");
    console.log(req.body);
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend" });
});

app.post("/api/generateHexTiles", (req, res) => {
    console.log("Tiles request");
    const size = req.body.rowLengths || 24;
    const tiles = generateHexTiles(size);

    const { username } = req.body;
    req.session.user = { username };
    console.log("Session created");
    res.json(tiles);
});

app.post("/api/makeMove", (req, res) => {
    const tileId = req.body.tileId;
    const roadId = req.body.roadId;
    const msg = `"Road build on tile id: ", ${tileId}, " and road id: ", ${roadId}`;
    console.log(msg);
    res.json(msg);
});

const PORT = 5000;
app.listen(PORT, () =>
    console.log(`Backend running on http://localhost:${PORT}`)
);
