function logIntoBancaribe(credentials) {
    const usernameInput = document.getElementById('userid');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('botonA');

    usernameInput.value = credentials.username;
    passwordInput.value = credentials.password;

    submitBtn.click();
}

function logIntoProvincial(credentials) {
    const usernameInput = document.getElementById('NUMDOCI');
    const passwordInput = document.getElementById('claveIngreso');
    const submitBtn = document.getElementById('BotonIngresar');
    
    usernameInput.value = credentials.username;    
    passwordInput.value = credentials.password;

    submitBtn.click();
}

function login(credentials) {
    switch (credentials.btnText) {
        case 'bancaribe':
            logIntoBancaribe(credentials);
            break;
        case 'provincial':
            logIntoProvincial(credentials);
            break;
    }
}

exports.login = login;