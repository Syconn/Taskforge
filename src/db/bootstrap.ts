import { initDB } from "./sqlite";

let initialized = false;

export async function initDatabase() {
    if (initialized) return;

    await initDB();

    initialized = true;
}