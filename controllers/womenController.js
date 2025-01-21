let womenModel = require('../models/womenModel');

const getNewWomenListApi = async (req, res) => {
    try {
        let data = {};
        let result = await womenModel.getNewWomenList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getBestSellWomenListApi = async (req, res) => {
    try {

        let data = {};
        let result = await womenModel.getBestSellWomenList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getHandbagListApi = async (req, res) => {
    try {
        let data = {};

        let result = await womenModel.getHandbagList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getSlingBagListApi = async (req, res) => {
    try {
        let data = {};

        let result = await womenModel.getSlingBagList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getClutchesListApi = async (req, res) => {
    try {
        let data = {};
        let result = await womenModel.getClutchesList(data);
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getMessengerListApi = async (req, res) => {
    try {
        let data = {};
        let result = await womenModel.getMessengerList(data);
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

module.exports = { getNewWomenListApi, getBestSellWomenListApi, getHandbagListApi, getSlingBagListApi, getClutchesListApi, getMessengerListApi }