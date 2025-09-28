import { Socket } from "socket.io";
import GameEvents from "./gameEvent.js";
import RoomManager from "./roomManager.js";

const connectedPlayers = new Map();

function setupWebSocket(io) {
    io.on("connection", (socket) => {
        console.log("Players connected: ", socket.id);
    });

    connectedPlayers.set(socket.id, {
        socketId: socket.id,
        userId: null,
        username: null,
        roomId: null,
    });
}
