const express = require("express")
const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const billing = require('./routes/billing');
const menCollection = require('./routes/menCollection');
const womenCollection = require('./routes/womenCollection');

//app.use('/admin/billing', billing);
//app.use('/admin/menCollection', menCollection);
//app.use('/admin/womenCollection', womenCollection);


const port = 8080;
require('./dbConnection');
// const { dbConnection } = require('./dbConnection');

app.listen(port, () => {
    console.log('Express server started on port :' + port);
    // dbConnection();
});