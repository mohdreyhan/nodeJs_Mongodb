const express = require("express");
const router = express.Router();

let StatusSchema = require("../models/status");

router.get("/", (req, res) => {
  StatusSchema.find(function (error, results) {
    if (!error) {
      res.send({
        status: 200,
        results: results,
      });
    }
  });
});

module.exports = router;
