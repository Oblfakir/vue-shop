const uuidV1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const users = dbData.users;

const sessionTokenName = 'session-token';

const authorizedUsers = {};

function isValidUser(login, password) {
    var isValid = false;

    users.forEach(function(user) {
        if(user.login === login && user.password === password) {
            isValid = true;
        }
    });

    return isValid;
}

function checkLoginAuth(login, sessionToken) {
    const token = authorizedUsers[login];

    return !!token && token === sessionToken;
}

function findUserByToken(sessionToken) {
    for (let i in authorizedUsers){
        if(authorizedUsers.hasOwnProperty(i)) {
            var token = authorizedUsers[i];

            if(token === sessionToken) {
                return authorizedUsers[i]
            }
        }
    }

    return null;
}

function checkTokenAuth(sessionToken){
    return !!findUserByToken(sessionToken);
}

function login(req, res) {
    const login = req.body.login;
    const password = req.body.password;
    const sessionToken = req.headers[sessionTokenName];

    if (checkLoginAuth(login, sessionToken)) {
        res.sendStatus(200);
        return;
    }

    if(!isValidUser(login, password)) {
        res.sendStatus(400);
        return;
    }

    const newSessionToken = uuidV1();
    authorizedUsers[login] = newSessionToken;
    res.set(sessionTokenName, newSessionToken);
    res.set('access-control-expose-headers', sessionTokenName);
    res.sendStatus(200);
}

function logout(req, res) {
    const login = req.body.login;
    const sessionToken = req.headers[sessionTokenName];

    if (!checkLoginAuth(login, sessionToken)) {
        res.sendStatus(400);
        return;
    }

    delete authorizedUsers[login];
    res.sendStatus(200);
}

function isAuthorized(req, res, next) {
    const sessionToken = req.headers[sessionTokenName];

    if (sessionToken && checkTokenAuth(sessionToken)) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function getUserByToken(req, res) {
    const sessionToken = req.headers[sessionTokenName];
    const login = findUserByToken(sessionToken);

    if (login) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(users.find(x => x.login === login)))
    } else {
        res.sendStatus(404);
    }
}

module.exports = {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    getUserByToken: getUserByToken
};