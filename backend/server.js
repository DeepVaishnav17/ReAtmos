
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 🔥 app must be defined BEFORE use
const app = express();

// middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// 🔥 passport AFTER dotenv
const passport = require("./config/passport");
app.use(passport.initialize());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/auth", require("./routes/authOAuth"));
app.use("/api/profile", require("./routes/profileRoutes"));


// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
