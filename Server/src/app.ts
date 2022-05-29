//constants
const port: number = parseInt(process.env.PORT || "3000");

console.log("Setting up...");

import express from "express";
import http from 'http';
import { Server } from "socket.io";
import cors from 'cors';
import SocketController from "./SocketController";
import GameController from "./game/GameController";

const expressInstance = express();
expressInstance.use(cors);

const server = http.createServer(expressInstance);
const socketInstance = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

//instantiate socket here
const gameController = new GameController();
const socketController = new SocketController(socketInstance, gameController);

server.listen(port, "localhost", () => {
    console.log(`Running on port: ${port}`);
});


