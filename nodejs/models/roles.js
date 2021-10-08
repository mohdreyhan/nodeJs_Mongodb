const mongoose = require("mongoose");

const RolesSchema = mongoose.Schema({
  name: {
    type: String,
  },
  // createAt: {
  //   type: String,
  // },
  // updatedAt: {
  //   type: String,
  //   default: Date.now()
  // },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("roles", RolesSchema);
