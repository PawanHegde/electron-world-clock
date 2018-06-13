const { app, BrowserWindow } = require('electron');

let mainWindow = null;
function createWindow() {
    let windowOptions = {
        "width": 800,
        "height": 600
    }
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadFile('./app/index.html');
}

app.on('ready', createWindow)