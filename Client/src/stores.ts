import type { Writable, Readable} from 'svelte/store'
import { writable, readable } from 'svelte/store';
import { io, Socket } from "socket.io-client";

import type {ServerToClientEvents, ClientToServerEvents, GameUpdate, team} from "./interfaces";

function get(key: string, def: any = "", parse: boolean = false): any {
    const value = localStorage.getItem(key);
    if (!parse) return value || def;
    if (value === null) return def;
    return JSON.parse(value);
}

const storedMode: string = get("mode", "light");

export const mode = writable(storedMode);
mode.subscribe((value) => {
    localStorage.setItem("mode", value)
});

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("https://covid-clicker.ncp.nathanferns.xyz", { transports :  ['websocket', 'polling', 'flashsocket'] });
console.log("connected!");

export const WebSocket: Readable<Socket<ServerToClientEvents, ClientToServerEvents>> = readable(socket);
export const GameState: Writable<GameUpdate> = writable();
export const Region: Writable<number> = writable(-1);
export const Team: Writable<team> = writable(0);

socket.on("gameupdate", (state) => {
    GameState.set(state)
})



