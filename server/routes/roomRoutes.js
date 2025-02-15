const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const {room, create_room} = require("../controllers/roomController");
const {access} = require("../utils/routeAccess")

router.post("/create_room", authUser, create_room);
router.post("/", authUser, room)
router.get("/", authUser, access)
router.get("/playground", authUser, access)

module.exports = router;