

const express = require("express");
const passport = require("passport");

const router = express.Router();

/* ========= GITHUB ========= */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const { user, token } = req.user;

    const needsProfile = !user.role;

    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${token}&needsProfile=${needsProfile}`
    );
  }
);

/* ========= GOOGLE ========= */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { user, token } = req.user;

    const needsProfile = !user.role;

    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${token}&needsProfile=${needsProfile}`
    );
  }
);

module.exports = router;
