import { RedisStore } from "connect-redis";

export function makeMove(moves, moveData, playerId) {
    moves = moves ? JSON.parse(moves) : [];
    const move = {
        tileId: tileId,
        roadId: roadId,
        playerId: playerId,
    };

    if (moves)
        if (move.tileId && move.roadId) {
            moves.push(move);
        }
}
