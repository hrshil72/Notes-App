const express = require("express");
const router = express.Router();
const { dashboardPage } = require("../controllers/dashboardController");
const isLoggedIn = require("../middlewares/authCheck");

router.get("/dashboard", isLoggedIn, dashboardPage);

module.exports = router;
