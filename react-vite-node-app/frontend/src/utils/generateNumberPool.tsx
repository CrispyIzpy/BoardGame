// utils/generateNumberPool.ts
export const generateNumberPool = (): number[] => {
    const pool: number[] = [];

    for (let i = 3; i <= 11; i++) {
        if (i !== 8) pool.push(i, i);
    }

    pool.push(0, 2, 8, 12);
    return pool;
};

export const shuffleArray = (array: number[]): number[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
