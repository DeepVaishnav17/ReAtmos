const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateToken = (id, rememberMe = false) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: rememberMe ? "30d" : "1d" }
  );
};


// 📝 REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, organizationName } = req.body;

    if (!name || !email || !password || !role) {
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      organizationName: organizationName || null,
    });

    res.status(201).json({
      message: "Registration successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        carbonCoins: user.carbonCoins,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// 🔐 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password, rememberMe  } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user._id,  rememberMe),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        carbonCoins: user.carbonCoins,
      },
    });
  } catch (err) {
  console.error(err);
  res.status(500).json({ message: "Server error" });
}
};

// 🧩 COMPLETE PROFILE (OAuth users)
exports.completeProfile = async (req, res) => {
  try {
    const { role, organizationName } = req.body;

    if (!role || !organizationName) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    user.organizationName = organizationName;

    await user.save();

    res.json({
      message: "Profile completed",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

