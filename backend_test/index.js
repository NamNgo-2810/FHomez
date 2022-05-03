var express = require('express');
var app = express();

var bodyParser = require('body-parser');;
app.use(bodyParser.urlencoded({express: false}));
app.use(bodyParser.json());

var homeRouter = require('./app/routers/home.routers');
require('./app/routers/user.routers')(app);
//require('./app/routers/motel.routers')(app);
app.use('/', homeRouter);


app.listen(8000, function(){
    console.log("Port listening = 8000!!!")
});