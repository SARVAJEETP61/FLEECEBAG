let express = require('express');
let path = require('path');
const app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve the "img" folder for image assets
app.use('/img', express.static(path.join(__dirname, 'img')));

// Use the router for '/admin' routes

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

let router = require('./routers/otherPageRouter');
let menRouter = require('./routers/menPageRouter');
let womenRouter = require('./routers/womenPageRouter');

const http = require('http').Server(app);
var port = 8080;
//require('./dbConnection');

app.use(router);
app.use(menRouter);
app.use(womenRouter);


http.listen(port, () => {
    console.log('Express server started on port :' + port);
    //dbConnection();
    //console.log('DB connection successful!');
});
