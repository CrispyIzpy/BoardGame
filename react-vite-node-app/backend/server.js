const express = require("express");
const cors = require("cors");

const { generateHexTiles } = require("./tileGenerator");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend" });
});

app.post("/api/generateHexTiles", (req, res) => {
    console.log("Tiles request");
    const size = req.body || 24;
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

const PORT = 5000;
app.listen(PORT, () =>
    console.log(`Backend running on http://localhost:${PORT}`)
);
