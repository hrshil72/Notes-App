const express = require("express");
const router = express.Router();
const { homepage } = require("../controllers/index");

router.get("/", homepage);

module.exports = router;
