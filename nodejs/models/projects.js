const mongoose = require("mongoose");

const ProjectsSchema = mongoose.Schema({
    name: {
        type: String,
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    owner: {
        type: String
    }
});

module.exports = mongoose.model("projects", ProjectsSchema);

