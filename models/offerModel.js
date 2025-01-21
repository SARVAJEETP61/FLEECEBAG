let client = require('../dbConnection');

// let collection = client.db('fleecebagDB').collection('offers');
let collection1 = client.db('fleecebagDB').collection('itemOther');

async function getOtherItemData(userData) {
    const query = { isNew :true };
    const finalarray = await collection1.find(query).toArray();
    // finalarray.extend(await collection1.find(query).toArray());
    // finalarray.extend(await collection1.find(query).toArray());
    return finalarray;
}
    

module.exports = { getOtherItemData };