let menModel = require('../models/men');

const getMenProducts = async (req, res) => {
    try {
        let result = await menModel.getMenProducts();
        res.status(200).json({ statusCode: 200, data: result, message: 'success' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Database error', error: err });
    }
};

module.exports = { getMenProducts };