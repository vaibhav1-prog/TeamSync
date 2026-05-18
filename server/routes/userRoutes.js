const express = require("express");
const { getUsers } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", protect, allowRoles("admin"), getUsers);

module.exports = router;