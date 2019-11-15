const url = 'http://localhost:3000';

const paths = {
    LOGIN: `${url}/api/login`
}

export function getSessionToken() {
    return localStorage.getItem('session-token');
}

export function setSessionToken(token) {
    localStorage.setItem('session-token', token);
}

export function login(data) {
    const body = JSON.stringify({ login: data.login, password: data.password });

    return fetch(paths.LOGIN, {
        body,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}