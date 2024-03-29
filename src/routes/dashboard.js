const express = require("express");
const router = express.Router();
const {
  dashboardPage,
  dashboardViewPage,
  dashboardUpdatePage,
  dashboardDeleteNote,
} = require("../controllers/dashboardController");
const isLoggedIn = require("../middlewares/authCheck");

router.get("/dashboard", isLoggedIn, dashboardPage);
router.get("/dashboard/item/:id", isLoggedIn, dashboardViewPage);
router.put("/dashboard/item/:id", isLoggedIn, dashboardUpdatePage);
router.delete("/dashboard/item-delete/:id", isLoggedIn, dashboardDeleteNote);

module.exports = router;
