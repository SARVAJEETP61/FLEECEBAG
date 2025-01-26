let menModel = require('../models/menModel');

const getNewMenListApi = async (req,res) => {
    try {
        let data = {};
        let result = await menModel.getNewMenList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getBestSellMenListApi = async (req,res) => {
    try {
        
        let data = {};
        let result = await menModel.getBestSellMenList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getLaptopBagListApi = async (req,res) => {
    try {
        let data = {};
        
        let result = await menModel.getLaptopBagList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getSlingBagListApi = async (req,res) => {
    try {
        let data = {};
        
        let result = await menModel.getSlingBagList(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

const getWalletListApi = async (req,res) => {
    try {
        let data = {};
        let result = await menModel.getWalletList(data);
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}
module.exports =  { getNewMenListApi, getBestSellMenListApi, getLaptopBagListApi, getSlingBagListApi, getWalletListApi}