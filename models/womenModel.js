let client = require('../dbConnection');

let collection = client.db('fleecebagDB').collection('menProducts');

async function getNewWomenList() {
    const query = { isNew: true };
    return await collection.find(query).toArray();
}

async function getBestSellWomenList() {
    const query = { isItBestDeal: true };
    return await collection.find(query).toArray();
}

async function getHandbagList() {
    const query = { type: "handbags" };
    return await collection.find(query).toArray();
}

async function getSlingBagList() {
    const query = { type: "slingBag" };
    return await collection.find(query).toArray();
}

async function getClutchesList() {
    const query = { type: "clutches" };
    return await collection.find(query).toArray();
}

async function getMessengerList() {
    const query = { type: "messenger" };
    return await collection.find(query).toArray();
}

module.exports = { getNewWomenList, getBestSellWomenList, getHandbagList, getSlingBagList, getClutchesList, getMessengerList };