const url = 'http://localhost:3000';

const paths = {
    LOGIN: `${url}/api/login`,
    LOGOUT: `${url}/api/logout`,
    USERS: `${url}/api/users`,
    USER_INFO: `${url}/api/user`,
    ROLES: `${url}/api/roles`,
    CATEGORIES: `${url}/api/categories`,
    PRODUCTS: `${url}/api/products`,
}

export function getSessionToken() {
    return localStorage.getItem('session-token');
}

export function setSessionToken(token) {
    localStorage.setItem('session-token', token);
}

export function removeSessionToken() {
    localStorage.removeItem('session-token');
}

function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'session-token': getSessionToken()
        },
    }).catch(() => {});
}

function post(url, body) {
    return fetch(url, {
        body: typeof body === 'string' ? body : JSON.stringify(body),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session-token': getSessionToken()
        },
    }).catch(() => {});
}

export function login(data) {
    return post(paths.LOGIN, { login: data.login, password: data.password })
        .then(res => {
            const sessionToken = res.headers.get('session-token');

            if (sessionToken) {
                setSessionToken(sessionToken);
            }

            return res.status === 200;
        });
}

export function logout() {
    return post(paths.LOGOUT).then(removeSessionToken);
}

export function getUserData() {
    return get(paths.USER_INFO).then(res => res.status === 200 ? res.json() : null);
}

export function checkAuthStatus() {
    return get(paths.USERS).then(res => {
        if (res.status !== 200) {
            removeSessionToken();
        }

        return res.status === 200;
    });
}