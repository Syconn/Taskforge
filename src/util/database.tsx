import Dexie, { type EntityTable } from "dexie";
import type { Board } from "./data";

export type DBEntry = {
    id: number;
    project: Board
    lastModified: Date
}

class ProjectDatabase extends Dexie {
    projects!: EntityTable<DBEntry, "id">;

    constructor() {
        super("ProjectsDatabase");
        this.version(1).stores({
            projects: "++id, project, lastModified"
        });
    }
}

export const db = new ProjectDatabase();

db.projects.hook('updating', () => {
    return { lastModified: new Date() };
});