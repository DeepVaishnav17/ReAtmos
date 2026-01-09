const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /* 🔐 AUTH PROVIDER */
    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },

    /* 🔑 PASSWORD (LOCAL ONLY) */
    password: {
      type: String,
      minlength: 6,
      required: function () {
        return this.provider === "local";
      },
    },

    /* 🧩 OAUTH IDS */
    googleId: {
      type: String,
      default: null,
    },

    githubId: {
      type: String,
      default: null,
    },

    /* 👤 PROFILE INFO */
    role: {
      type: String,
      enum: ["student", "organizer", "institution", "company"],
      default: null, // 🔥 important for OAuth
    },

    organizationName: {
      type: String,
      default: null,
    },

    /* 🌱 CARBON DATA */
    carbonCoins: {
      type: Number,
      default: 0,
    },

    totalEmissionsReduced: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
