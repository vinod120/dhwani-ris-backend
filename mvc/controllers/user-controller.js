const mongoose = require("mongoose")
const User = require("../models/User")
const State = require("../models/State")
const District = require("../models/District")

const users = require("../users")
const states = require("../states")
const district = require('../district')

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { loginValidation, registerValidation } = require("../validation");

const db = mongoose.connection;

db.once('open', async () => {
  if ((await User.countDocuments().exec()) > 0) {
    return;
  }
  User.insertMany(users)
    .then(() => res.json("Users added successfully"))
    .catch((err) => res.status(400).json('Error: ' + err))
})

const getUsers = (req, res) => {
  // console.log(User)
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

const addUser = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const username = await User.findOne({ username: req.body.username });
  if (username) {
    return res.status(400).send("username already exists in the database");
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const userLogin = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send("username or password is wrong");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");


  //create token  
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);

};

const userLogout = (req, res) => {
  res.json(200).send("successfully logout")
}

const getState = (req, res) => {
  // console.log(User)
  State.find()
    .then((states) => res.json(states))
    .catch((err) => res.status(400).json("Error: " + err));
};

const postState = (async, (req, res) => {
  const state = new State({
    state: req.body.state,
  });

  try {
    const stateSaved = await state.save();
    res.send(stateSaved);
  } catch (err) {
    res.status(400).send(err);
  }
})

const getState = (req, res) => {
  // console.log(User)
  State.find()
    .then((states) => res.json(states))
    .catch((err) => res.status(400).json("Error: " + err));
};

const postState = (async, (req, res) => {
  const state = new State({
    state: req.body.state,
  });

  try {
    const stateSaved = await state.save();
    res.send(stateSaved);
  } catch (err) {
    res.status(400).send(err);
  }
})


const getDistrict = (req, res) => {
  // console.log(User)
  District.find()
    .then((district) => res.json(district))
    .catch((err) => res.status(400).json("Error: " + err));
};

const postDistrict = (async, (req, res) => {
  const dist = new State({
    district: req.body.district,
  });

  try {
    const distSaved = await state.save();
    res.send(distSaved);
  } catch (err) {
    res.status(400).send(err);
  }
})

module.exports = { getUsers, addUser, userLogin, userLogout, getState, postState, getDistrict, postDistrict };