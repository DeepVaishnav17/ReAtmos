const express = require("express");
const { register, login } = require("../controllers/authController");




const router = express.Router();
const { completeProfile } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.put("/complete-profile", protect, completeProfile);


router.post("/register", register);
router.post("/login", login);

module.exports = router;
