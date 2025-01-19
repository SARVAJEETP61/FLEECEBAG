let womenModel = require('../models/women');

const getWomenProducts = async (req, res) => {
    try {
        let result = await womenModel.getWomenProducts();
        res.status(200).json({ statusCode: 200, data: result, message: 'success' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Database error', error: err });
    }
};

module.exports = { getWomenProducts };