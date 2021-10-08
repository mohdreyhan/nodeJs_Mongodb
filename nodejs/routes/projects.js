const express = require("express");
const router = express.Router();
let ProjectsSchema = require("../models/projects");
let httpStatus = require("../constants/httpStatus");

router.get("/", (req, res) => {
    ProjectsSchema.find().exec(function (error, results) {
        if (!error) {
            res.send({
                status: 200,
                result: results,
            });
        }
    });
});

router.get("/:id", (req, res) => {
    ProjectsSchema.findById({ _id: req.params.id }, function (error, results) {
        if (!error) {
            res.send({
                status: 200,
                results: results,
            });
        }
    });
});

router.post("/", async (req, res) => {
    const params = req.body.createProjInputs;
    try {
        const data = await ProjectsSchema.create(params);
        res.status(200).json({ status: httpStatus.success, message: "Project added successfully", results: data })
    } catch (error) {
        res.status(400).json({ status: httpStatus.failure, message: "Unable to create project due to " + error.message })
    }
});

router.delete("/multiple", async (req, res) => {
    try {
        const data = await ProjectsSchema.deleteMany({userId : req.app.locals.userId}, { _id: req.body.projectIds })
        res.status(200).json({ status: httpStatus.success, message: "Records deleted successfully" })
    } catch (error) {
        res.status(400).json({ status: httpStatus.failure, message: "Error while deleting records due to" + error })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const data = await ProjectsSchema.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ status: httpStatus.success, message: "Record deleted successfully" })
    } catch (error) {
        res.status(400).json({ status: httpStatus.failure, message: "Error while deleting record due to" + error })
    }
})

module.exports = router;
