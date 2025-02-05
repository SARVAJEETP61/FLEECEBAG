let client = require('../dbConnection');

let collection = client.db('fleecebagDB').collection('order');

async function addOrder(orderData) {
    orderData.orderId = ""+Math.floor(Math.random() * (90000-10000) * 10000) + new Date().valueOf();
    orderData.orderDate = new Date();
    return await collection.insertOne(orderData);
}

async function getOrderList(userData) {
    console.log(userData.userId);
    const query = { userId : userData.userId };
    const data = JSON.stringify(collection.find(query).toArray()).toString();
    console.log(data);
    return await collection.find(query).toArray();
}

async function getOrder(orderData) {
    const query = { orderId : orderData.orderId , userId : orderData.userId };
    return await collection.findOne(query);
}

module.exports = { addOrder, getOrderList, getOrder };