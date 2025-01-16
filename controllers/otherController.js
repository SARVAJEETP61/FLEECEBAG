let otherModel = require('../models/otherModel');

const getOtherItemDataApi = async (req,res) => {
    try {
        let data = {};//req.body;
        console.log("M")
        let result = await otherModel.getOtherItemData(data);
        let result1 = await otherModel.getOtherItemData1(data);
        res.status(201).json({ statusCode: 201, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

module.exports =  { getOtherItemDataApi }