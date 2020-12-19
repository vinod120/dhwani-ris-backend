const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },

  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
}, {
  versionKey: false
});

module.exports = mongoose.model("User", userSchema);