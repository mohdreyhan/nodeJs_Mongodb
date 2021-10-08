const express = require("express");
const router = express.Router();

let RolesSchema = require("../models/roles");

router.get("/", (req, res) => {
  RolesSchema.find(function (error, results) {
    if (!error) {
      res.send({
        status: 200,
        results: results,
      });
    }
  });
});

router.post("/createrole", async (req, res) => {
  const params = {
    name: "employee/manager",
    status: "enabled",
  };
  try {
    let results = await RolesSchema.create(params);
    res.send({
      status: 200,
      results: results,
      message: "Role Added Successfully",
    });
  } catch (error) {
    res.send({
      status: 200,
      message: "Error while adding role due to" + error,
    });
  }
});

module.exports = router;
