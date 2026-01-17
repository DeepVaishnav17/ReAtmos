const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  completeProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.put("/complete-profile", protect, completeProfile);

module.exports = router;
