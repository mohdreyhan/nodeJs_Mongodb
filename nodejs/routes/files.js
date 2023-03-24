const express = require("express");
const router = express.Router();
let ImagesSchema = require("../models/images");
let httpStatus = require("../constants/httpStatus");
let uploadS3 = require("../lib/FileToS3");

router.get("/", (req, res) => {
    ImagesSchema.find().exec(function (error, results) {
        if (!error) {
            res.send({
                status: 200,
                result: results,
            });
        }
    });
});

router.get("/:id", (req, res) => {
    ImagesSchema.findById({ _id: req.params.id }, function (error, results) {
        if (!error) {
            res.send({
                status: 200,
                results: results,
            });
        }
    });
});

router.post("/upload", uploadS3.array('file',5), async (req, res) => {
    console.log("dsfdsf",req.files)
    if (req.files) {
        let params = {
            name: req.files[0].originalname,
            type: req.files[0].mimetype,
            size: req.files[0].size,
            location: req.files[0].location,
            createdAt: Date.now(),
            owner: global.userId
        }
        try {
            let data = await ImagesSchema.create(params);
            res.status(200).json({ status: httpStatus.success, message: "File uploaded successfully" })
        } catch (error) {
            res.status(400).json({ status: httpStatus.failure, message: "Error while storing file to database due to" + error })
        }
    } else {
        res.status(400).json({ status: httpStatus.failure, message: "Error while uploading file"})
    }
});

router.delete("/multiple", async (req, res) => {
    try {
        const data = await ImagesSchema.deleteMany({ userId: req.app.locals.userId }, { _id: req.body.projectIds })
        res.status(200).json({ status: httpStatus.success, message: "Records deleted successfully" })
    } catch (error) {
        res.status(400).json({ status: httpStatus.failure, message: "Error while deleting records due to" + error })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const data = await ImagesSchema.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ status: httpStatus.success, message: "Record deleted successfully" })
    } catch (error) {
        res.status(400).json({ status: httpStatus.failure, message: "Error while deleting record due to" + error })
    }
})

module.exports = router;


