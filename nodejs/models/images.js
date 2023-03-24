const mongoose = require("mongoose");

const ImagesSchema = mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String
    },
    size: {
        type: Number
    },
    createdAt: {
        type: String
    },
    location: {
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

module.exports = mongoose.model("images", ImagesSchema);

