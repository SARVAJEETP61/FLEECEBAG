const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = `mongodb+srv://s224394372:5ep3VHN7RNLOF25s@cluster0.dhiel.mongodb.net/`;

const client = new MongoClient(uri);

module.exports = client;