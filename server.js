const express = require("express");
const http = require("http");
const path = require("path");
const router = require("./routers/router");
require("./dbConnection"); // Ensure the database connection is initialized

// Initialize the Express application
const app = express();
const port = 8080;

// Middleware
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Routes
app.use("/admin", router); // Route all '/admin' requests to the admin router

// Create and start the HTTP server
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});