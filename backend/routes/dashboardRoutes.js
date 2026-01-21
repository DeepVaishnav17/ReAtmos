const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

/* Dashboard home summary */
router.get("/home", authMiddleware, async (req, res) => {
  const user = req.user;

  res.json({
    greeting: `Welcome ${user.name}`,
    carbonCoins: user.carbonCoins,
    totalEmissionsReduced: user.totalEmissionsReduced,
    location: user.location,
  });
});

module.exports = router;
