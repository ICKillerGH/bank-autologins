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

ipcRenderer.on('showLoader', () => {
    const loaderDiv = document.createElement('div');

    loaderDiv.id = 'loader';

    loaderDiv.setAttribute('style', `
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, .75);
        color: white;
        font-size: 45px;
        font-weight: bold;
    `)

    loaderDiv.innerHTML = `
        <p>Cargando...</p>
    `

    document.body.appendChild(loaderDiv);
});

ipcRenderer.on('login', (event, bankCredential) => {
    const loaderDiv = document.getElementById('loader');

    if (loaderDiv) loaderDiv.remove();

    login(bankCredential);
});