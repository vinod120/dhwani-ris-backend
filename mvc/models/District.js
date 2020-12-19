const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostDistrict = new Schema({
    district: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
})

module.exports = mongoose.model("District", PostDistrict)