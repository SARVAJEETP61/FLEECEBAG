let express = require('express');
let { Server } = require('socket.io');
let path = require('path');
let { fileURLToPath } = require('url');
let client = require('./dbConnection.js');
let userrouter = require('./routers/userrouter');
let Offer = require('./controllers/offersController.js');

const { collection } = require('./models/cartModel');
const app = express();



const port = 8080;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/img', express.static(path.join(__dirname, 'img')));


app.get('/subpages/:folder/:file.html', (req, res) => {
    const { folder, file } = req.params;
    const filePath = path.join(__dirname, 'subpages', folder, `${file}.html`);
    res.sendFile(filePath);
});


app.get('/:page.html', (req, res) => {
    const { page } = req.params;
    const filePath = path.join(__dirname, `${page}.html`);
    res.sendFile(filePath);
});

let router = require('./routers/router.js');
let menRouter = require('./routers/menPageRouter');
let womenRouter = require('./routers/womenPageRouter');
let otherPageRouter = require('./routers/otherPageRouter.js');
let orderPageRouter = require('./routers/orderPageRouter.js');
let cartPageRouter = require('./routers/cartPageRouter');

const http = require('http').Server(app);

require('./dbConnection');

app.use('/', router);
app.use(menRouter);
app.use(userrouter);
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
});
