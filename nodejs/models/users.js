const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  emp_name: {
    type: String,
  },
  emp_email: {
    type: String,
  },
  emp_password: {
    type: String,
  },
  role: {
    type: String,
    default: "",
  },
  tokenStatus: {
    type: Boolean,
    default: false,
  },
  tokenCreatedAt: {
    type: Number,
    default: null,
  },

});

module.exports = mongoose.model("users", UsersSchema);
