const express = require('express');
const path = require("path");
const app = express();
const jsonServer = require('json-server');
const user = require('./api/users/GET.json');

/* Json server */

const server = jsonServer.create();
const router = jsonServer.router(user);
const middlewares = jsonServer.defaults();

//const bodyParser = require('body-parser');
//const apiMocker = require('connect-api-mocker');
var cors = require('cors');

const PORT = process.env.PORT || 8080;

server.use(jsonServer.bodyParser)
//app.use('/api', apiMocker('api'));
app.use(express.static(path.resolve(__dirname, "../client/build")));

server.use(middlewares);
server.use('/api', router);
server.use(cors({
    origin: '*'
}));

//const signRouter = require('./routes/routes');

//app.use('/api/users', signRouter);

server.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Server is now running on port ${PORT}`);
});