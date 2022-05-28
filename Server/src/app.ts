//constants
const port: number = parseInt(process.env.PORT || "8001");

console.log("Setting up...");

import express from "express";
import http from 'http';
import { Server, Socket } from "socket.io";
import cors from 'cors';
import SocketController from "./SocketController";
import GameController from "./game/GameController";

const expressInstance = express();
expressInstance.use(cors);
expressInstance.use(express.static(__dirname + "/game"));

const server = http.createServer(expressInstance);
const socketInstance = new Server(server, {
    cors: {
        origin: '*'
    }
});

//instantiate socket here
const gameController = new GameController();
const socketController = new SocketController(socketInstance, gameController);

server.listen(port, "0.0.0.0", () => {
    console.log(`Running on port: ${port}`);
});


