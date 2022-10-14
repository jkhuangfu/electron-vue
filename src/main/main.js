const { app, BrowserWindow, ipcMain, net, Notification, dialog } = require('electron')

const { test } = require('../server/server')

const path = require('path')

function showNotifiy() {
    new Notification({
        title: '提醒',
        body: '这是通知内容，啦啦啦啦啦~~~',
        icon: path.join(__dirname, '../../128x128.png')
    }).show()
}

function showDialog() {
    dialog.showMessageBox({
        type: 'info',
        cancelId: 1,
        title: '提示信息',
        message: '内容',
        // cancelId: 0,
        buttons: ['取消', '确定']

    }).then(idx => {
        console.log(idx)
    })
}
const winURL = path.resolve(__dirname, "../renderer/index.html");
const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 600,
        icon: path.join(__dirname, 'favicon.ico'),
        // titleBarStyle: 'hidden', // 隐藏标题栏 mac
        titleBarOverlay: true, //  隐藏标题栏 windows
        // transparent: true, // 透明窗口
        frame: false,
        // show: false,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            webviewTag: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })


    ipcMain.handle('ping', (_, arg) => arg)
    // ipcMain.handle('get-data-test', async () => await test())
    ipcMain.handle('get-data-test', showNotifiy)
    ipcMain.handle('net', () => net.isOnline())
    if (!app.isPackaged) {
        // 开发环境
        win.loadURL('http://localhost:9008/')
        win.webContents.openDevTools();
    } else {
        win.loadURL(`file://${winURL}`)
    }
}

if (process.platform === 'darwin') {
    // mac系统 dock栏图标
    app.dock.setIcon(path.join(__dirname, '../../128x128.png'))
}

app.whenReady().then(() => {

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});