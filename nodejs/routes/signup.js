const express = require("express");
const router = express.Router();

let UsersSchema = require("../models/users");

router.post("/", async (req, res) => {
  const params = {
    emp_name: req.body.signupInputs.username,
    emp_email: req.body.signupInputs.email,
    emp_password: req.body.signupInputs.password,
  };
  const post = new UsersSchema(params);
  try {
    await post.save();
    res.send({
      status: 200,
      message: "Signup Successfull, Login to continue",
    });
  } catch (err) {
    res.send({
      status: 200,
      message: "Error while signing up",
    });
  }
});

module.exports = router;
