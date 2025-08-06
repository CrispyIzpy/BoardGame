function generateNumberPool() {
    const pool = [];

    for (let i = 2; i <= 12; i++) {
        if (i === 7) continue;
        pool.push(i, i); // two of each number
    }

    return pool;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function generateHexTiles(shape = []) {
    const totalTiles = shape.reduce((sum, row) => sum + row, 0);
    const numberPool = shuffleArray(generateNumberPool());

    // Pick a random index where the tile will have number 7 (desert)
    const desertTileIndex = Math.floor(Math.random() * totalTiles);

    const tiles = [];
    let tileId = 0;

    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row]; col++) {
            const type = tileId % 2 === 0;

            let number;
            if (tileId === desertTileIndex) {
                number = 7;
            } else if (numberPool.length > 0) {
                const idx = Math.floor(Math.random() * numberPool.length);
                number = numberPool.splice(idx, 1)[0];
            } else {
                number = -1; // fallback (shouldn't happen)
            }

            tiles.push({
                id: tileId,
                number,
                type,
                row,
                col,
            });

            tileId++;
        }
    }

    return tiles;
}
