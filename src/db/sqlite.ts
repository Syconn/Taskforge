import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";
import { app } from "electron";

// IMPORTANT: force correct wasm path handling
const SQL_WASM_PATH = require.resolve("sql.js/dist/sql-wasm.wasm");

const dbPath = path.join(app.getPath("userData"), "app.db");

let SQL: any;
let db: any;

export async function initDB() {
    SQL = await initSqlJs({
        locateFile: () => SQL_WASM_PATH
    });

    if (fs.existsSync(dbPath)) {
        const fileBuffer = fs.readFileSync(dbPath);
        db = new SQL.Database(fileBuffer);
    } else {
        db = new SQL.Database();

        db.run(`
            CREATE TABLE IF NOT EXISTS boards (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                favorite INTEGER NOT NULL DEFAULT 0,
                tone TEXT NOT NULL CHECK (tone IN ('red', 'blue', 'violet', 'slate'))
            );
        `);

        persist();
    }
}

export function getDB() {
    if (!db) throw new Error("DB not initialized");
    return db;
}

export function persist() {
    const data = db.export();
    fs.writeFileSync(dbPath, Buffer.from(data));
}