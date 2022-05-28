import type { Writable } from 'svelte/store'
import { writable, readable } from 'svelte/store';
import { io, Socket} from "socket.io-client";

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


const socket: Socket = io("0.0.0.0:3001");

// socket.send("click");
export const WebSocket = readable(socket);

