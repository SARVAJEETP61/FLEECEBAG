let orderModel = require('../models/orderModel');

const addOrderApi = async (req, res) => {
    try {
        let data = req.body;
        let result = await orderModel.addOrder(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data saved successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getOrderListApi = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        let result = await orderModel.getOrderList(data);
        console.log(result);
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getOrderApi = async (req, res) => {
    try {
        let data = req.body;
        let result = await orderModel.getOrder(data);
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

module.exports = { addOrderApi, getOrderListApi, getOrderApi }