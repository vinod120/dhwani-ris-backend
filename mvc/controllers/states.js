const mongoose = require("mongoose")
const dotenv = require("dotenv");

//models
const State = require('../models/states')
const District = require('../models/states')
const Childrens = require('../models/states')

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

const addState = async (req, res, next) => {

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

const addDistrict = (async (res, req) => {
  const st_name = await State.findOne({ state_name: req.body.state_name });
  if (st_name) {
    State.find()
      .then((states) => {
        states.findIndex(item => item.name == st_name)
      })
      .then(res => res.json(201).send(res))
      .catch((err) => res.json(400).send(err))

    const state = new District({
      district_name = req.body.district_name,
      state_name = req.body.state_name,
    })

    try {
      const savedState = await state.save();
      res.send(savedState);
    } catch (err) {
      res.status(400).send(err);
    }
  }
  else {
    res.status(400).send("State not avaialble")
  }

})


const getDistrict = (req, res) => {
  // console.log(User)
  District.find()
    .then((district) => res.json(district))
    .catch((err) => res.status(400).json("Error: " + err));
};
module.exports = { getStates, addState, addDistrict , getDistrict};