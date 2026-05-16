import { Board } from "../util/data";
import { getDB, persist } from "./sqlite";

export class BoardRepo {
    private db = getDB();

    create(board: Board) {
        this.db.run(
            `
            INSERT INTO boards (id, title, favorite, tone)
            VALUES (?, ?, ?, ?)
            `,
            [
                board.id,
                board.title,
                board.favorite ? 1 : 0,
                board.tone
            ]
        );

        persist();
    }

    update(id: string, board: Partial<Board>) {
        this.db.run(
            `
            UPDATE boards
            SET
                title = COALESCE(?, title),
                favorite = COALESCE(?, favorite),
                tone = COALESCE(?, tone)
            WHERE id = ?
            `,
            [
                board.title ?? null,
                board.favorite !== undefined ? (board.favorite ? 1 : 0) : null,
                board.tone ?? null,
                id
            ]
        );

        persist();
    }

    delete(id: string) {
        this.db.run(
            `DELETE FROM boards WHERE id = ?`,
            [id]
        );

        persist();
    }

    findAll(): Board[] {
        const result = this.db.exec(`SELECT * FROM boards`);

        if (!result.length) return [];

        const cols = result[0].columns;
        const rows = result[0].values;

        return rows.map((row: any[]) => {
            const obj: any = {};

            cols.forEach((col: string, i: number) => {
                obj[col] = row[i];
            });

            return {
                id: obj.id,
                title: obj.title,
                favorite: Boolean(obj.favorite),
                tone: obj.tone
            };
        });
    }

    findById(id: string): Board | undefined {
        const result = this.db.exec(
            `SELECT * FROM boards WHERE id = ?`,
            [id]
        );

        if (!result.length || !result[0].values.length) {
            return undefined;
        }

        const cols = result[0].columns;
        const row = result[0].values[0];

        const obj: any = {};
        cols.forEach((col: string, i: number) => {
            obj[col] = row[i];
        });

        return {
            id: obj.id,
            title: obj.title,
            favorite: Boolean(obj.favorite),
            tone: obj.tone
        };
    }
}