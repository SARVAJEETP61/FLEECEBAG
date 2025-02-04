let client = require('../dbConnection');

let collection = client.db('fleecebagDB').collection('order');

async function addOrder(orderData) {
    orderData.orderId = orderData.userId + new Date().valueOf();
    return await collection.insertOne(orderData);
}

async function getOrderList(userData) {
    const query = { userId : userData.userId };
    return await collection.find(query).toArray();
}

async function getOrder(orderData) {
    const query = { orderId : orderData.orderId };
    return await collection.findOne(query);
}

module.exports = { addOrder, getOrderList, getOrder };