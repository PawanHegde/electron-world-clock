require("babel-register");
const { app, BrowserWindow } = require('electron');

let mainWindow = null;
function createWindow() {
    let windowOptions = {
        "width": 800,
        "height": 600
    }
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL('file://' + __dirname + '/index.html')
}

app.on('ready', createWindow)