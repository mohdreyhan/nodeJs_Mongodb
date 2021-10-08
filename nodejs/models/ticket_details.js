const mongoose  = require("mongoose");

const TicketSchema = mongoose.Schema({
    task_id : {
        type : String
    },
    task_name : {
        type : String
    },
    emp_id : {
        type : String
    },
    review_date : {
        type : Date
    },
    status : {
        type : String
    },
    start_time : {
        type : String
    },
    end_time : {
        type : String
    },
    work_hours : {
        type : String
    },
    comments : {
        type : String
    },
});

module.exports = mongoose.model("ticket_details",TicketSchema);

