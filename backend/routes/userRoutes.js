const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

/* GET current logged-in user */
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    location: req.user.location,
    carbonCoins: req.user.carbonCoins,
    totalEmissionsReduced: req.user.totalEmissionsReduced,
    apiCenter: req.user.apiCenter,
  });
});

module.exports = router;
