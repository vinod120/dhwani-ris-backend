const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostState = new Schema({
    state: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
})

module.exports = mongoose.model("State", PostState)