const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const {history} = require("../controllers/historyController");
const { access } = require("../utils/routeAccess");

router.post("/", authUser, history)
router.get("/", authUser, access)

module.exports = router;