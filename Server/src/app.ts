//constants
const port = process.env.PORT || 3000;

console.log("Setting up...");

import express from "express";
import http from 'http';
import { Server, Socket } from "socket.io";
import cors from 'cors';
import SocketController from "./SocketController";
import GameController from "./game/GameController";

const gameController = new GameController();
const expressInstance = express();
expressInstance.use(cors);

const server = http.createServer(expressInstance);
const socketInstance = new Server(server, {
    cors: {
        origin: '*'
    }
});

//instantiate socket here
const socketController = new SocketController(socketInstance, gameController);

server.listen(port, () => {
    console.log(`Running on port: ${port}`);
});


