const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1️⃣ Try to get email
        let email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        // 2️⃣ Find by githubId first (MOST IMPORTANT)
        let user = await User.findOne({ githubId: profile.id });

        // 3️⃣ If not found, try email
        if (!user && email) {
          user = await User.findOne({ email });
        }

        // 4️⃣ Create new user if still not found
        if (!user) {
          user = await User.create({
            name: profile.username || profile.displayName,
            email: email || `github_${profile.id}@oauth.local`, // 🔥 fallback
            provider: "github",
            githubId: profile.id,
            role: null,
            organizationName: null,
          });
        }

        const token = generateToken(user._id);
        return done(null, { user, token });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

/* ================= GOOGLE ================= */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            provider: "google",     // ✅ IMPORTANT
            googleId: profile.id,   // ✅ IMPORTANT
            role: null,
            organizationName: null,
          });
        }

        const token = generateToken(user._id);
        return done(null, { user, token });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
