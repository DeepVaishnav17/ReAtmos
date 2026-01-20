const User = require("../models/User");
const ApiCenter = require("../models/ApiCenter");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { distanceKm } = require("../utils/geo");

const generateToken = (id, rememberMe = false) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: rememberMe ? "30d" : "1d" }
  );
};

/* ================= REGISTER ================= */
// exports.register = async (req, res) => {
//   console.log("REQ BODY 👉", req.body);

//   try {
//     const { name, email, password, role, organizationName, location } = req.body;

//     if (!name || !email || !password || !role || !location) {
//       return res.status(400).json({ message: "All required fields missing" });
//     }

//     if (
//       ["organizer", "institution", "company"].includes(role) &&
//       !organizationName
//     ) {
//       return res.status(400).json({
//         message: "Organization / Institution name required",
//       });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     /* 🔹 1. Convert location → lat/lng */
// const geoRes = await fetch(
//   `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//     location
//   )}&limit=1`,
//   {
//     headers: {
//       "User-Agent": "carbon-app/1.0 (contact@yourapp.com)",
//     },
//   }
// );


//     const geoData = await geoRes.json();

//     if (!geoData.length) {
//       return res.status(400).json({ message: "Invalid location" });
//     }

//     const userLat = parseFloat(geoData[0].lat);
//     const userLng = parseFloat(geoData[0].lon);

//     /* 🔹 2. Find nearest API center */
//     const centers = await ApiCenter.find();
//     if (!centers.length) {
//       return res.status(500).json({ message: "No API centers configured" });
//     }

//     let nearestCenter = null;
//     let minDistance = Infinity;

//     for (const center of centers) {
//       const d = distanceKm(userLat, userLng, center.lat, center.lng);
//       if (d < minDistance) {
//         minDistance = d;
//         nearestCenter = center;
//       }
//     }

//     /* 🔹 3. Create user */
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       organizationName: organizationName || null,
//       location: location,
//       assignedApiCenter: nearestCenter.name,
//       distanceToCenterKm: Math.round(minDistance),
//     });

//     res.status(201).json({
//       message: "Registration successful",
//       token: generateToken(user._id),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         userLocation: user.userLocation,
//         assignedApiCenter: user.assignedApiCenter,
//         distanceKm: user.distanceToCenterKm,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };




exports.register = async (req, res) => {
  //console.log("REQ BODY 👉", req.body);

  try {
    const { name, email, password, role, organizationName, location } = req.body;

    if (!name || !email || !password || !role || !location) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    if (
      ["organizer", "institution", "company"].includes(role) &&
      !organizationName
    ) {
      return res.status(400).json({
        message: "Organization / Institution name required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    /* 🔹 1. Convert location → lat/lng */
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}&limit=1`,
      {
        headers: {
          "User-Agent": "carbon-app/1.0 (contact@yourapp.com)",
        },
      }
    );

    const geoData = await geoRes.json();

    if (!geoData.length) {
      return res.status(400).json({ message: "Invalid location" });
    }

    const userLat = parseFloat(geoData[0].lat);
    const userLng = parseFloat(geoData[0].lon);

    /* 🔹 2. Find nearest API center */
    const centers = await ApiCenter.find();
    if (!centers.length) {
      return res.status(500).json({ message: "No API centers configured" });
    }

    let nearestCenter = null;
    let minDistance = Infinity;

    for (const center of centers) {
      const d = distanceKm(userLat, userLng, center.lat, center.lng);
      if (d < minDistance) {
        minDistance = d;
        nearestCenter = center;
      }
    }

    /* 🔹 3. Create user */
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      organizationName: organizationName || null,

      location, // user's actual city
      apiCenter: nearestCenter._id, // ✅ correct relation
      distanceToCenterKm: Math.round(minDistance),
    });

    res.status(201).json({
      message: "Registration successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        apiCenter: nearestCenter.name,
        distanceKm: user.distanceToCenterKm,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.provider !== "local") {
      return res.status(400).json({
        message: "Please sign in using Google or GitHub",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user._id, rememberMe),
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============== COMPLETE PROFILE ============== */
exports.completeProfile = async (req, res) => {
  try {
    const { role, organizationName } = req.body;

    if (!role || !organizationName) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    user.organizationName = organizationName;
    await user.save();

    res.json({ message: "Profile completed", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============== FORGOT & RESET PASSWORD ============== */
// 🔹 Your existing forgot/reset logic stays unchanged


/* ============== FORGOT PASSWORD ============== */
exports.forgotPassword = async (req, res) => {
  //console.log("Forgot password hit" + req.body.email);
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    // Prevent email enumeration
    if (!user) {
      return res.status(200).json({
        message: "If an account exists, a reset link has been sent",
      });
    }

    if (user.provider !== "local") {
      return res.status(400).json({
        message: "Password reset not available for social login accounts",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
   // console.log("RESET PASSWORD LINK:", resetUrl);
   const sendEmail = require("../utils/sendEmail");

await sendEmail({
  to: user.email,
  subject: "Reset your password",
  html: `
    <div style="font-family: Arial; line-height:1.6">
      <h2>Password Reset</h2>
      <p>You requested to reset your password.</p>
      <p>Click the button below (valid for 15 minutes):</p>
      <a href="${resetUrl}"
         style="
           display:inline-block;
           padding:12px 18px;
           background:#22c55e;
           color:#022c22;
           text-decoration:none;
           border-radius:8px;
           font-weight:600;
         ">
         Reset Password
      </a>
      <p style="margin-top:20px;font-size:13px;color:#555">
        If you didn’t request this, ignore this email.
      </p>
    </div>
  `,
});


    res.status(200).json({
      message: "If an account exists, a reset link has been sent",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ============== RESET PASSWORD ============== */
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // 1️⃣ Hash token from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // 2️⃣ Find valid user
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    // 3️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Update password + clear reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful. You can now login.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
