import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import GameController from "./game/GameController";

export default class SocketController {
    static singleton: SocketController;

    constructor(private socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, gameController: GameController) {
        if(SocketController.singleton === undefined) {
            return;
        }
        
        SocketController.singleton = this;
        socket.sockets.on('connection', (socket: Socket) => {
            socket.on('click', data => {
                gameController.onClick(data);
            });
            socket.on('upgrade', data => {
                gameController.onUpgrade(data);
            });
        });
    }

    public sendMessage(event: string, data: any) {
        this.socket.emit(event, data);
    }
}

