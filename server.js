let express = require('express');
let { Server } = require('socket.io');
let path = require('path');
let { fileURLToPath } = require('url');
let router = require('./routers/router.js');
let otherPageRouter = require('./routers/otherPageRouter.js'); // Ensure your router file uses ES modules
let client = require('./dbConnection.js');
let Offer = require('./controllers/offersController.js');


const app = express();
const http = require('http').Server(app);
//const server = http.createServer(app); // Create an HTTP server
//const io = new Server(server); // Attach socket.io to the HTTP server


// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve the "img" folder for image assets
app.use('/img', express.static(path.join(__dirname, 'img')));

// Use the router for '/admin' routes
app.use('/', router);
app.use('/', otherPageRouter);

// Dynamic route to serve HTML files in the subpages folder
app.get('/subpages/:folder/:file.html', (req, res) => {
    const { folder, file } = req.params;
    const filePath = path.join(__dirname, 'subpages', folder, `${file}.html`);
    res.sendFile(filePath);
});

// Route to serve top-level HTML files
app.get('/:page.html', (req, res) => {
    const { page } = req.params;
    const filePath = path.join(__dirname, `${page}.html`);
    res.sendFile(filePath);
});

let othetrouter = require('./routers/otherPageRouter');
let menRouter = require('./routers/menPageRouter');
let womenRouter = require('./routers/womenPageRouter');

var port = 8080;
require('./dbConnection');
//const { dbConnection } = require('./dbConnection');
app.use(othetrouter);
app.use(menRouter);
app.use(womenRouter);


http.listen(port, () => {
    console.log('Express server started on port :' + port);
    //dbConnection();
});

//let express =  require('express');
// let http = require ('http');
let { Server } = require ('socket.io');
//let path = require ('path');
let { fileURLToPath } = require ('url');
let client = require('./dbConnection.js');
let Offer = require ('./controllers/offersController.js');

const { collection } = require('./models/cartModel');
//const app = express();
// const server = http.createServer(app); // Create an HTTP server
// const io = new Server(server); // Attach socket.io to the HTTP server


const port = 8080;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve the "img" folder for image assets
app.use('/img', express.static(path.join(__dirname, 'img')));


// Dynamic route to serve HTML files in the subpages folder
app.get('/subpages/:folder/:file.html', (req, res) => {
    const { folder, file } = req.params;
    const filePath = path.join(__dirname, 'subpages', folder, `${file}.html`);
    res.sendFile(filePath);
});

// Route to serve top-level HTML files
app.get('/:page.html', (req, res) => {
    const { page } = req.params;
    const filePath = path.join(__dirname, `${page}.html`);
    res.sendFile(filePath);
});

let router = require ('./routers/router.js');
let menRouter = require('./routers/menPageRouter');
let womenRouter = require('./routers/womenPageRouter');
let otherPageRouter = require ('./routers/otherPageRouter.js');
let orderPageRouter = require ('./routers/orderPageRouter.js');
let cartPageRouter = require('./routers/cartPageRouter');


//const http = require('http').Server(app);

// var port = 8080;
require('./dbConnection');

app.use('/', router);

app.use(menRouter);
app.use(womenRouter);
app.use('/', otherPageRouter);
app.use(orderPageRouter);
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));
app.use('/partials', express.static(path.join(__dirname, 'partials')));
app.use('/subpages', express.static(path.join(__dirname, 'subpages')));
app.use(cartPageRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

http.listen(port, () => {
    console.log('Express server started on port :' + port);
    //dbConnection();
    //console.log('DB connection successful!');
});
