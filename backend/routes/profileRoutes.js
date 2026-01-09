const express = require("express");
const { completeProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/complete-profile", authMiddleware, completeProfile);

module.exports = router;
