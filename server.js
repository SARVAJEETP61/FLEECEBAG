var express = require("express")
var app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



let router = require('./routers/otherPageRouter');
const http = require('http').Server(app);
var port = 8080;
require('./dbConnection');
// const { dbConnection } = require('./dbConnection');
app.use(router);


http.listen(port, () => {
    console.log('Express server started on port :' + port);
    // dbConnection();
});