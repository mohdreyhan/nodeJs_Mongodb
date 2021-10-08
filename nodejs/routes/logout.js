const express = require("express");
const router = express.Router();

let UsersSchema = require("../models/users");

router.post("/", (req, res) => {
  var emp_id = req.body.emp_id;
  const updateDataObj = {};
  updateDataObj.tokenStatus = false;
  updateDataObj.tokenCreatedAt = null;
  UsersSchema.updateOne(
    { _id: emp_id },
    updateDataObj,
    function (error, results) {
      if (!error) {
        res.send({
          status: 200,
          message: "Logged out Successfully",
        });
      }
    }
  );
});

module.exports = router;
