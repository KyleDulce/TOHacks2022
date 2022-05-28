//constants
const port = process.env.PORT || 3000;

console.log("Setting up...");

import express from "express";
import http from 'http';
import { Server, Socket } from "socket.io";
import cors from 'cors';
import SocketController from "./SocketController";

const expressInstance = express();
expressInstance.use(cors);

const server = http.createServer(expressInstance);
const socketInstance = new Server(server, {
    cors: {
        origin: '*'
    }
});

//instantiate content delivery here

//instantiate socket here
const socketController = new SocketController(socketInstance);

server.listen(port, () => {
    console.log(`Running on port: ${port}`);
});


