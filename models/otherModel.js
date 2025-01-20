let client = require('../dbConnection');

let collection = client.db('fleecebagDB').collection('itemOther');

async function getNewOtherItemList(userData) {
    const query = { isNew :true };
    return await collection.find(query).toArray();
}

async function getBestSellOtherItemList(userData) {
    const query = { isItBestDeal :true };
    return await collection.find(query).toArray();
}

async function getschoolBagList(userData) {
    const query = {type : "schoolBag"};
    return await collection.find(query).toArray();
}

async function getToteBagList(userData) {
    const query = {type : "toteBag"};
    return await collection.find(query).toArray();
}

async function getTeavelBagList(userData) {
    const query = {type : "travelBag"};
    return await collection.find(query).toArray();
}


module.exports = { getNewOtherItemList, getBestSellOtherItemList, getschoolBagList, getToteBagList, getTeavelBagList};