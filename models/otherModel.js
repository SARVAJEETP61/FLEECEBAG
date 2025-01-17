let client = require('../dbConnection');

let collection = client.db('fleecebagDB').collection('itemOther');

async function getOtherItemData(userData) {
    console.log("lM")
    const query = { };
    let m = collection.find(query).toArray();
    console.log(m)
    return await collection.find(query).toArray();
}


module.exports = { getOtherItemData};