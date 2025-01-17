const router = require("express").Router();

const { exportCsv } = require("../controllers/billing");
const { verifyUser } = require("../middleware/users_JWT_auth");

router.route("/export-csv").post(verifyUser, exportCsv);

module.exports = router;