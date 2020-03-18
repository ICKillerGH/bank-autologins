const { ipcRenderer } = require('electron');
const { login } = require('./loginService');

const onLoadedFuncList = [];

const onContentLoaded = fn => onLoadedFuncList.push(fn);

document.addEventListener('DOMContentLoaded', () => onLoadedFuncList.forEach(fn => fn()));

onContentLoaded(() => {
    const divBankAutologins = document.getElementById('bankAutologins');

    if (!divBankAutologins) {
        return;
    }
    
    ipcRenderer.on('getCredentialsReply', (event, bankCredentials) => {
        bankCredentials.forEach(credential => {
            
            const btn = document.createElement('button');

            btn.classList.add('btn');

            btn.textContent = credential.btnText;

            btn.addEventListener('click', () => ipcRenderer.send('loadUrl', credential));

            divBankAutologins.appendChild(btn);
        });
    });
    
    ipcRenderer.send('getCredentials', null);
});

ipcRenderer.on('login', (event, bankCredential) => login(bankCredential));