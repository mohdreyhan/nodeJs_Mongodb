const mongoose = require("mongoose");

const StatusSchema = mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: Number,
    autoIncrement: true,
  },
});

module.exports = mongoose.model("status", StatusSchema);
