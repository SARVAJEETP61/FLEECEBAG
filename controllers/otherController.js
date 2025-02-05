let otherModel = require('../models/otherModel');

const getNewOtherItemListApi = async (req,res) => {
    try {
        let data = {};//req.body;
        console.log("M")
        let result = await otherModel.getNewOtherItemList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getBestSellOtherItemListApi = async (req,res) => {
    try {
        let data = {};//req.body;
        console.log("M")
        let result = await otherModel.getBestSellOtherItemList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getschoolBagListApi = async (req,res) => {
    try {
        let data = {};//req.body;
        console.log("M")
        let result = await otherModel.getschoolBagList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getToteBagListApi = async (req,res) => {
    try {
        let data = {};//req.body;
        console.log("M")
        let result = await otherModel.getToteBagList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getTeavelBagListApi = async (req,res) => {
    try {
        let data = {};//req.body;
        let result = await otherModel.getTeavelBagList(data);
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}
module.exports =  { getNewOtherItemListApi, getBestSellOtherItemListApi, getschoolBagListApi, getToteBagListApi, getTeavelBagListApi}

