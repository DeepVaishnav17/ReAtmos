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

    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },

    password: {
      type: String,
      minlength: 6,
      required: function () {
        return this.provider === "local";
      },
    },

    googleId: { type: String, default: null },
    githubId: { type: String, default: null },

    role: {
      type: String,
      enum: ["student", "organizer", "institution", "company"],
      default: null,
    },

    organizationName: {
      type: String,
      default: null,
    },

    carbonCoins: { type: Number, default: 0 },
    totalEmissionsReduced: { type: Number, default: 0 },

    // 🔐 FORGOT PASSWORD
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
