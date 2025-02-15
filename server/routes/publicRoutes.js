const express = require("express");
const router = express.Router();

const {public} = require("../controllers/publicController")

router.get("/", public)

module.exports = router;