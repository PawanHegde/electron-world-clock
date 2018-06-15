const { app, BrowserWindow } = require('electron');

let mainWindow = null;
function createWindow() {
    let windowOptions = {
        "width": 800,
        "height": 600
    }
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL('http://localhost:3000');
}

app.on('ready', createWindow)