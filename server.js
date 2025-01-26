const express = require('express');
const path = require('path');
const http = require('http');
const cartPageRouter = require('./routers/cartPageRouter');
const app = express();
const port = 8080;

require('./dbConnection');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/controllers', express.static(path.join(__dirname, 'controllers')));
app.use('/partials', express.static(path.join(__dirname, 'partials')));
app.use('/subpages', express.static(path.join(__dirname, 'subpages')));
app.use(cartPageRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running on port :${port}`);
});
