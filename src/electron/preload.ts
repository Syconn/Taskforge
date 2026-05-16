import { contextBridge, ipcRenderer } from "electron";
import { Board } from "../util/data";

contextBridge.exposeInMainWorld("boards", {
    create: (data: Board) => ipcRenderer.invoke("board:create", data),
    update: (id: string, data: Board) => ipcRenderer.invoke("board:update", id, data),
    delete: (id: string) => ipcRenderer.invoke("board:delete", id),
    getAll: () => ipcRenderer.invoke("board:getAll")
});

contextBridge.exposeInMainWorld("api", {
    createId: () => crypto.randomUUID()
});