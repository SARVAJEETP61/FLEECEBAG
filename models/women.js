let { getWomenCollection } = require('../dbConnection');

async function getWomenProducts() {
    const collection = getWomenCollection();
    if (!collection) throw new Error("Collection not initialized");
    return await collection.find({}).toArray();
}

module.exports = { getWomenProducts };