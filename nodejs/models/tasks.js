const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  sheet_name: {
    type: String,
    unique : true
  },
  sheet_data: {
    type: Array
  }
});

module.exports = mongoose.model("tasks", TaskSchema);
