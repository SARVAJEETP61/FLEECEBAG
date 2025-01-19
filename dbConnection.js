const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://sarvajeet1005:p5r7y91dksu6gc8L@cluster0.zdd1f.mongodb.net/CoffeeDB?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let menCollection, womenCollection;

async function runDBConnection() {
    try {
        await client.connect();
        menCollection = client.db("FleecebagDB").collection("menProducts");
        womenCollection = client.db("FleecebagDB").collection("womenProducts");
        console.log("Database connected and collection ready");
    } catch (ex) {
        console.error("Database connection error: ", ex);
    }
}

function getMenCollection() {
    return menCollection;
}

function getWomenCollection() {
    return womenCollection;
}

module.exports = { getMenCollection, getWomenCollection, runDBConnection };