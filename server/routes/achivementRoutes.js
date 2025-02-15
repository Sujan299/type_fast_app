const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const {achivement} = require("../controllers/achivementController");
const { access } = require("../utils/routeAccess");

router.post("/", authUser, achivement)
router.get("/", authUser, access)

module.exports = router;