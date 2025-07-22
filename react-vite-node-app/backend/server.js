const express = require("express");
const cors = require("cors");

const { generateHexTiles } = require("./tileGenerator");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend" });
});

app.get("/api/generateHexTiles", (req, res) => {
    console.log("Tiles request");
    const rowLenght = parseInt(req.query.rowLenght) || 24;
    const tiles = generateHexTiles(rowLenght);
    res.json(tiles);
});

const PORT = 5000;
app.listen(PORT, () =>
    console.log(`Backend running on http://localhost:${PORT}`)
);
