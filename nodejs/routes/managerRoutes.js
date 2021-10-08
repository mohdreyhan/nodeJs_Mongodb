const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let TaskSchema = require("../models/tasks");
let UserSchema = require("../models/users");
let TicketSchema = require("../models/ticket_details");
let RolesSchema = require("../models/roles");
let StatusSchema = require("../models/status");

router.post("/inserttask", (req, res) => {
  var sheet_name = req.body.sheet_name;
  var sheet_data = JSON.parse(req.body.task_data);
  const post = new TaskSchema({
    sheet_name: sheet_name,
    sheet_data: sheet_data.map((i) => {
      return {
        ...i,
        _id: new mongoose.Types.ObjectId(),
        Status: null,
        Assigned: null,
      };
    }),
  });
  post.save(function (error, results) {
    if (!error) {
      res.send({
        status: 200,
        message: "file Uploaded Successfully",
      });
    }
  });
  //   post.save(function(error, results) {
  //     if (results) {
  //       sheet_data.map((data, index) => {
  //         TaskSchema.updateOne(
  //           { _id: results._id },
  //           { $push : {sheet_data: {...data,_id: new mongoose.Types.ObjectId()}}},
  //           function(error, results) {
  //             console.log(results);
  //           }
  //         );
  //       });
  //     }
  //   });
});

router.post("/fetchtaskdetails", (req, res) => {
  var id = req.body.id;
  TaskSchema.find({ _id: id }).exec(function (error, results) {
    if (!error)
      res.send({
        status: 200,
        results: results,
      });
  });
});

router.get("/users", (req, res) => {
  UserSchema.find().exec(function (error, results) {
    if (!error) {
      res.send({
        status: 200,
        results: results,
      });
    }
  });
});

// router.get("/getroles", (req, res) => {
//   RolesSchema.find().exec(function (error, results) {
//     if (!error) {
//       res.send({
//         status: 200,
//         results: results,
//       });
//     }
//   });
// });

// router.post("/createrole", async (req, res) => {
//   console.log("asddddddddddddd");
//   const params = {
//     name: "employee/manager",
//     status: "enabled",
//   };
//   const post = new RolesSchema(params);
//   try {
//     await post.save();
//     res.send({
//       status: 200,
//       message: "Role Added Successfully",
//     });
//   } catch (err) {
//     res.send({
//       status: 200,
//       message: "Error while adding role" + err,
//     });
//   }
// });

router.post("/updateEmpTask", (req, res) => {
  var updatetask_Inputs = req.body.updatetask_Inputs;
  var task_id = req.body.task_id;
  var sheet_id = req.body.sheet_id;
  var sheet_data;
  var db_task_name, db_priority, db_due_date, db_status, db_assigned_to;
  TaskSchema.find({ _id: sheet_id }).exec(function (error, results) {
    if (!error) {
      sheet_data = results[0].sheet_data.filter((data) => data._id == task_id);
      (db_task_name =
        updatetask_Inputs.task_name === undefined ||
        updatetask_Inputs.task_name === ""
          ? sheet_data[0].Task
          : updatetask_Inputs.task_name),
        (db_priority =
          updatetask_Inputs.priority === undefined ||
          updatetask_Inputs.priority === ""
            ? sheet_data[0].Priority
            : updatetask_Inputs.priority),
        (db_due_date =
          updatetask_Inputs.due_date === undefined ||
          updatetask_Inputs.due_date === ""
            ? sheet_data[0].Due_Date
            : updatetask_Inputs.due_date),
        (db_status =
          updatetask_Inputs.status === undefined ||
          updatetask_Inputs.status === ""
            ? sheet_data[0].Status
            : updatetask_Inputs.status),
        (db_assigned_to =
          updatetask_Inputs.select_employee === undefined ||
          updatetask_Inputs.select_employee === ""
            ? sheet_data[0].Assigned
            : updatetask_Inputs.select_employee);
      console.log(
        db_task_name,
        db_priority,
        db_due_date,
        db_status,
        db_assigned_to
      );
    }
  });
});

router.post("/assignemp", (req, res) => {
  var assignemp_Inputs = req.body.assignemp_Inputs;
  var task_id = req.body.task_id;
  var task_name = req.body.task_name;
  var sheet_id = req.body.sheet_id;
  var sheet_data;

  const post = new TicketSchema({
    task_id: task_id,
    task_name: task_name,
    emp_id: assignemp_Inputs.select_employee,
    review_date: assignemp_Inputs.review_date,
    status: "Pending",
  });

  post.save(function (error, results) {
    if (!error) {
      TaskSchema.updateOne(
        {
          _id: sheet_id,
          "sheet_data._id": new mongoose.Types.ObjectId(task_id),
        },
        {
          $set: {
            "sheet_data.$.Status": "Assigned",
            "sheet_data.$.Assigned": assignemp_Inputs.select_employee,
          },
        },
        function (error, result) {
          if (!error) {
            console.log("amma ki chut");
            res.send({
              status: 200,
              message: "assigned Successfully",
            });
          }
        }
      );

      // TaskSchema.updateOne(
      //   {
      //     _id: sheet_id,
      //     sheet_data: {
      //       $elemMatch: {
      //         _id: new mongoose.Types.ObjectId(task_id)
      //       }
      //     }
      //   },
      //   {
      //     $set: {
      //       "sheet_data.$.Status": "Assigned"
      //     }
      //   },
      //   function(error, results) {
      //     console.log(results);
      //   }
      // );
    }
  });
});

router.get("/sheetdata", (req, res) => {
  TaskSchema.find().exec(function (error, results) {
    if (!error)
      res.send({
        status: 200,
        results: results,
      });
  });
});

router.get("/users", (req, res) => {
  UserSchema.find().exec(function (error, results) {
    if (!error)
      res.send({
        status: 200,
        results: results,
      });
  });
});

module.exports = router;
