const express = require("express");
const router = express.Router();
const {
  dashboardPage,
  dashboardAddNote,
  dashboardViewPage,
  dashboardUpdatePage,
  dashboardDeleteNote,
  dashboardSubmitNote,
  dashboardSearch,
  dashboardSearchSubmit,
} = require("../controllers/dashboardController");
const isLoggedIn = require("../middlewares/authCheck");

router.get("/dashboard", isLoggedIn, dashboardPage);
router.get("/dashboard/add", isLoggedIn, dashboardAddNote);
router.post("/dashboard/add", isLoggedIn, dashboardSubmitNote);
router.get("/dashboard/item/:id", isLoggedIn, dashboardViewPage);
router.put("/dashboard/item/:id", isLoggedIn, dashboardUpdatePage);
router.delete("/dashboard/item-delete/:id", isLoggedIn, dashboardDeleteNote);
router.get("/dashboard/item-delete/:id", isLoggedIn, dashboardDeleteNote);
router.get("/dashboard/search", isLoggedIn, dashboardSearch);
router.post("/dashboard/search", isLoggedIn, dashboardSearchSubmit);

module.exports = router;
