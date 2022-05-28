import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export default class SocketController {
    constructor(socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        socket.sockets.on('connection', (socket: Socket) => {
            socket.on('click', data => {
                //TODO ONCLICK HERE
            });
            socket.on('upgrade', data => {
                //TODO on upgrade here
            });
        });
    }
}

