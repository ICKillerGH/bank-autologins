const { app, BrowserWindow, ipcMain } = require('electron');
const { resolve } = require('path');
const { readFileSync } = require('fs');
const { format } = require('url');

const filePath = resolve(__dirname, 'assets', 'bank_credentials.json');

const fileContents = readFileSync(filePath, 'utf8');

const credentials = JSON.parse(fileContents);

let win = null;

function createWindow() {
    win = new BrowserWindow({
        width: 500,
        height: 150,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            preload: resolve(__dirname, 'preload.js')
        }
    });

    win.setMenu(null);
    
    win.loadURL(format({
        protocol: 'file',
        pathname: resolve(__dirname, 'index.html')
    }));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => app.quit());

ipcMain.on('getCredentials', (event, args) => {
    event.reply('getCredentialsReply', credentials);
});

ipcMain.on('loadUrl', (event, bankCredential) => {
    event.sender.once('did-finish-load', (e) => {
        event.sender.send('login', bankCredential);
    });

    if (win !== null) {
        win.maximize();
    }

    event.sender.loadURL(bankCredential.url);
});