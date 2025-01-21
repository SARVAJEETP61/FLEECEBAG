import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/otherPageRouter.js';
import http from 'http';
import './dbConnection.js';

const app = express();
const port = 8080;

// Resolving __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files for the 'controllers' folder (for JavaScript)
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));

// Serve images from a custom path if needed
const imagePath = path.join('E:/Important Documents/Deakin university/Assignments/FLEECEBAG-main/images');
app.use('/images', express.static(imagePath));

// Serve the 'partials' folder for reusable components (like header)
app.use('/partials', express.static(path.join(__dirname, 'partials')));

// Use the custom router for other pages
app.use(router);

// Set up the HTTP server
const server = http.createServer(app);

// Listen on the specified port
server.listen(port, () => {
    console.log(`Express server started on port :${port}`);
});
