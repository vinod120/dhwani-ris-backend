const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//models
const User = require('../models/users')
// const users = require('../data/users')

const {registerValidation, loginValidation} = require('../validation')

dotenv.config();

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

module.exports = { getUsers, addUser, userLogin, userLogout };