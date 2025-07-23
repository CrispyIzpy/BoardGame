function generateNumberPool() {
    const pool = [];

    for (let i = 1; i <= 12; i++) {
        if (i == 7) {
            continue;
        }
        pool.push(i, i);
    }

    return pool;
}

function shuffleArray() {
    array = generateNumberPool();
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function generateHexTiles(rowLenght) {
    array = shuffleArray();
    const tiles = [];

    // chose id for 7
    let randomIdZero = Math.floor(Math.random() * rowLenght);

    for (let i = 0; i < rowLenght; i++) {
        const isEven = i % 2 === 0;

        // add the 7 in the tiles
        if (i == randomIdZero) {
            tiles.push({
                id: i,
                number: 7,
                isEven: isEven,
            });
            continue;
        }
        let randomElement;
        if (array.length === 0) {
            number = -1;
        } else {
            let randomIndex = Math.floor(Math.random() * array.length);
            randomElement = array[randomIndex];
            array.splice(randomIndex, 1);
        }

        tiles.push({
            id: i,
            number: randomElement,
            isEven: isEven,
        });
    }
    return tiles;
}

module.exports = { generateHexTiles };
