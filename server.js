import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/otherPageRouter.js';
import http from 'http';
import './dbConnection.js';

const app = express();
const port = 8080;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));
const imagePath = path.join('E:/Important Documents/Deakin university/Assignments/FLEECEBAG-main/images');
app.use('/images', express.static(imagePath));
app.use('/partials', express.static(path.join(__dirname, 'partials')));
app.use('/subpages', express.static(path.join(__dirname, 'subpages')));



app.use(router);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running on port :${port}`);
});
