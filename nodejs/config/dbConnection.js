const mongoose = require("mongoose");

function connect(){
  mongoose
    .connect(
      "mongodb+srv://NeedforSpeed1786:NeedforSpeed1786@project1.jaohh.mongodb.net/Work_Tracker",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected to MongoDB.."))
    .catch(() => console.error("could not connect to mongoDB"));
};
module.exports = connect;
