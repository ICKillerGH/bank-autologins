const { app, BrowserWindow, ipcMain } = require('electron');
const { resolve } = require('path');
const { readFileSync } = require('fs');

const filePath = resolve(__dirname, 'assets', 'bank_credentials.json');

const fileContents = readFileSync(filePath, 'utf8');

const credentials = JSON.parse(fileContents);

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            preload: resolve(__dirname, 'preload.js')
        }
    });

    win.loadURL(`file://${__dirname}/index.html`);
    
    win.webContents.openDevTools();

    win.maximize();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => app.quit());

ipcMain.on('getCredentials', (event, args) => {
    event.reply('getCredentialsReply', credentials);
});

ipcMain.on('loadUrl', (event, bankCredential) => {
    event.sender.once('dom-ready', (e) => {
        event.sender.send('login', bankCredential);
    });

    event.sender.loadURL(bankCredential.url);
});