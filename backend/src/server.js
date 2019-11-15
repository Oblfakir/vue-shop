const jsonServer = require('json-server');
const path = require('path')
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');
const authRoutes = require('./auth-routes');

const PORT = process.env.PORT || 3000;

server.use(middlewares);

server.use(bodyParser.json());
server.post('/api/login', authRoutes.login);
server.post('/api/logout', authRoutes.logout);
server.use('/api', authRoutes.isAuthorized);
server.use('/api', router);

server.listen(PORT, function() {
  console.log('JSON Server is running on port ' + PORT);
});