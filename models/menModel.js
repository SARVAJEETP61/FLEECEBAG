let client = require('../dbConnection');

let collection = client.db('fleecebagDB').collection('menProducts');

async function getNewMenList() {
    const query = { isNew: "true" };
    return await collection.find(query).toArray();
}

async function getBestSellMenList() {
    const query = { isItBestDeal: "true" };
    return await collection.find(query).toArray();
}

async function getLaptopBagList() {
    const query = { type: "laptopBag" };
    return await collection.find(query).toArray();
}

async function getSlingBagList() {
    const query = { type: "slingBag" };
    return await collection.find(query).toArray();
}

async function getWalletList() {
    const query = { type: "wallets" };
    return await collection.find(query).toArray();
}


module.exports = { getNewMenList, getBestSellMenList, getLaptopBagList, getSlingBagList, getWalletList };