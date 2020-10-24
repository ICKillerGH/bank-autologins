function logIntoBancaribe(credentials) {
    const usernameInput = document.getElementById('userid');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('botonA');

    usernameInput.value = credentials.username;

    passwordInput.value = credentials.password;

    submitBtn.click();
}

function logIntoProvincial(credentials) {
    const usernameInput = document.getElementById('cedula');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submit');
    const spaceKeyEvent = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelBubble: false,
        cancelable: true,
        charCode: 0,
        code: "Space",
        composed: true,
        ctrlKey: false,
        currentTarget: null,
        defaultPrevented: false,
        detail: 0,
        eventPhase: 0,
        isComposing: false,
        isTrusted: true,
        key: " ",
        keyCode: 32,
        location: 0,
        metaKey: false,
        repeat: false,
        returnValue: true,
        shiftKey: false,
        type: "keyup",
        which: 32
    });
    const backKeyEvent = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelBubble: false,
        cancelable: true,
        charCode: 0,
        code: "Backspace",
        composed: true,
        ctrlKey: false,
        currentTarget: null,
        defaultPrevented: false,
        detail: 0,
        eventPhase: 0,
        isComposing: false,
        isTrusted: true,
        key: "Backspace",
        keyCode: 8,
        location: 0,
        metaKey: false,
        repeat: false,
        returnValue: true,
        shiftKey: false,
        type: "keyup",
        which: 8,
    });

    usernameInput.focus();
    usernameInput.value = credentials.username;
    usernameInput.dispatchEvent(spaceKeyEvent);
    usernameInput.dispatchEvent(backKeyEvent);
    
    passwordInput.focus();
    passwordInput.value = credentials.password;
    passwordInput.dispatchEvent(spaceKeyEvent);
    passwordInput.dispatchEvent(backKeyEvent);

    submitBtn.focus();
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