let otherModel = require('../models/otherModel');

const getOtherItemDataApi = async (req,res) => {
    try {
        let data = {};//req.body;
        console.log("M")
        let result = await otherModel.getOtherItemData(data);
        console.log(result)
        res.status(200).json({ statusCode: 200, data: result, message: "Data Load successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message, error: err });
    }
}

module.exports =  { getOtherItemDataApi }