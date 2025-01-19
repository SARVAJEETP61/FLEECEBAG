let { getMenCollection } = require('../dbConnection');

async function getMenProducts() {
    const collection = getMenCollection();
    if (!collection) throw new Error("Collection not initialized");
    return await collection.find({}).toArray();
}

module.exports = { getMenProducts };