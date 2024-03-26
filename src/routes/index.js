const express = require("express");
const router = express.Router();
const { homepage, aboutpage } = require("../controllers/index");

router.get("/", homepage);
router.get("/about", aboutpage);

module.exports = router;
