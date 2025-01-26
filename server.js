let express =  require('express');
// let http = require ('http');
let { Server } = require ('socket.io');
let path = require ('path');
let { fileURLToPath } = require ('url');
let router = require ('./routers/router.js');
let otherPageRouter = require ('./routers/otherPageRouter.js'); // Ensure your router file uses ES modules
let client = require('./dbConnection.js');
let Offer = require ('./controllers/offersController.js');

const { collection } = require('./models/cartModel');
const app = express();
// const server = http.createServer(app); // Create an HTTP server
// const io = new Server(server); // Attach socket.io to the HTTP server


const port = 8080;

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


let menRouter = require('./routers/menPageRouter');
let womenRouter = require('./routers/womenPageRouter');
let cartPageRouter = require('./routers/cartPageRouter');


const http = require('http').Server(app);
// var port = 8080;
require('./dbConnection');

app.use(menRouter);
app.use(womenRouter);
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));
app.use('/partials', express.static(path.join(__dirname, 'partials')));
app.use('/subpages', express.static(path.join(__dirname, 'subpages')));
app.use(cartPageRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

http.listen(port, () => {
    console.log('Express server started on port :' + port);
    //dbConnection();
});
