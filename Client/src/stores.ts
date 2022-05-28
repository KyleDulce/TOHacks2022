import type { Writable } from 'svelte/store'
import { writable, readable } from 'svelte/store';

function get(key: string, def: any = "", parse: boolean = false): any {
    const value = localStorage.getItem(key);
    if (!parse) return value || def;
    if (value === null) return def;
    return JSON.parse(value);
}

const storedName: string = get("name");
const storedMode: string = get("mode", "light");

export const name = writable(storedName);
name.subscribe((value) => {
    localStorage.setItem("name", value)
});

export const mode = writable(storedMode);
mode.subscribe((value) => {
    localStorage.setItem("mode", value)
});