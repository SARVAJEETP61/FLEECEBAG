//const db = require("../models");
let converter = require("json-2-csv");

const exportCsv = async (req, res) => {
    try {

    } catch (error) {
        return res.json({
            status: 500,
            message: "something went wrong",
            error: error.message,
        })
    }
}

module.exports = { exportCsv };