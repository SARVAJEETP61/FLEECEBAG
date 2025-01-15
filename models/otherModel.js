let client = require('../dbConnection');

let collection = client.db('fleecebagDB').collection('itemOther');

async function getOtherItemData(userData) {
    console.log("lM")
    let m = await collection.findOne();
    console.log(m)
    return await collection.findOne();
}

async function getOtherItemData1(userData) {
    return await collection.findOne();
}



module.exports = { getOtherItemData , getOtherItemData1 };