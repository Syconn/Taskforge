import { app, BrowserWindow, ipcMain } from 'electron';
import started from 'electron-squirrel-startup';
import path from 'node:path';
import { BoardService } from '../service/board.service';
import { initDatabase } from '../db/bootstrap';

if (started) {
    app.quit();
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(
            path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
        );
    }

    mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Services
app.whenReady().then(async () => {
    await initDatabase();

    const boardData = new BoardService();

    ipcMain.handle("board:create", (_, data) => {
        return boardData.create(data);
    });

    ipcMain.handle("board:update", (_, id, data) => {
        return boardData.update(id, data);
    });

    ipcMain.handle("board:delete", (_, id) => {
        return boardData.delete(id);
    });

    ipcMain.handle("board:getAll", () => {
        return boardData.getAll();
    });
})