const express = require('express');
const app = express();
const path = require("path");
const jsonServer = require('json-server');
const goods = require('./api/goods/GET.json');

//const bodyParser = require('body-parser');
//const apiMocker = require('connect-api-mocker');
var cors = require('cors');
const PORT = process.env.PORT || 8080;

app.use(jsonServer.bodyParser);
app.use(express.static(path.join(__dirname, '../client/build')));  // THIS LINE IS USED FOR DEPLOYING AND I'M NOT REALLY UNDERSTAND WHY
app.use(cors({
    origin: '*'
}));
app.use('/api', jsonServer.router(goods));

//const signRouter = require('./routes/routes');

//app.use('/api/users', signRouter);

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Server is now running on port ${PORT}`);
});
