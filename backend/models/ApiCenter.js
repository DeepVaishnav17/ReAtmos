const mongoose = require("mongoose");

const apiCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("ApiCenter", apiCenterSchema);
