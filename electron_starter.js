const { app, BrowserWindow, Menu, shell } = require('electron');

let mainWindow = null;
function createWindow() {
    let windowOptions = {
        "width": 800,
        "height": 600,
    }
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.setTitle("Alternative")
    mainWindow.loadURL('file://' + __dirname + '/src/index.html')
    mainWindow.toggleDevTools()
}

app.on('ready', () => {
    const template = [
        {
            label: 'Edit',
            submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            {role: 'selectall'}
            ]
        },
        {
            label: 'View',
            submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {role: 'toggledevtools'},
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
            ]
        },
        {
            role: 'window',
            submenu: [
            {role: 'minimize'},
            {role: 'close'}
            ]
        },
        {
            role: 'help',
            submenu: [
            {
                label: 'Learn More',
                click () { shell.openExternal('https://github.com/PawanHegde/electron-world-clock') }
            }
            ]
        }
    ]
    
    if (process.platform === 'darwin') {
        template.unshift({
            submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services', submenu: []},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
            ]
        })
    
        // Edit menu
        template[1].submenu.push(
            {type: 'separator'},
            {
            label: 'Speech',
            submenu: [
                {role: 'startspeaking'},
                {role: 'stopspeaking'}
            ]
            }
        )
    
        // Window menu
        template[3].submenu = [
            {role: 'close'},
            {role: 'minimize'},
            {role: 'zoom'},
            {type: 'separator'},
            {role: 'front'}
        ]
    }

    menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    createWindow()
})