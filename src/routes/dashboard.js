const express = require("express");
const router = express.Router();
const {
  dashboardPage,
  dashboardViewPage,
  dashboardUpdatePage,
} = require("../controllers/dashboardController");
const isLoggedIn = require("../middlewares/authCheck");

router.get("/dashboard", isLoggedIn, dashboardPage);
router.get("/dashboard/item/:id", isLoggedIn, dashboardViewPage);
router.put("/dashboard/item/:id", isLoggedIn, dashboardUpdatePage);

module.exports = router;
