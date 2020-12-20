const mongoose = require("mongoose")
const dotenv = require("dotenv");

//models
const State = require('../models/states')

dotenv.config();

const db = mongoose.connection;

db.once('open', async () => {
  if ((await State.countDocuments().exec()) > 0) {
    return;
  }
  State.insertMany(states)
    .then((res) => res.json("Users added successfully"))
    .catch((err) => res.status(400).json('Error: ' + err))
})

const getStates = (req, res) => {
  // console.log(User)
  State.find()
    .then((states) => res.json(states))
    .catch((err) => res.status(400).json("Error: " + err));
};

const addState= async (req, res, next) => {

  const state_name = await State.findOne({ state_name: req.body.state_name });
  if (state_name) {
    return res.status(400).send("state_name already exists in the database");
  }

  const state = new State({
    state_name: req.body.state_name,
  });

  try {
    const savedState = await state.save();
    res.send(savedState);
  } catch (err) {
    res.status(400).send(err);
  }
};




module.exports = { getStates, addState };