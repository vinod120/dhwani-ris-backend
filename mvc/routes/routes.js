const express = require("express");
const router = express.Router();
const verify = require('../verifyTokens')

const { getUsers, addUser, userLogin, userLogout} = require("../controllers/users");
const { getStates, addState, addDistrict, getDistrict } = require("../controllers/states");

router.get("/", getUsers);
router.post("/register", addUser);
router.post("/login", userLogin)
router.get("/logout", verify, userLogout)

router.get("/get-state", getStates)
router.post("/post-state", verify, addState)


router.post("/post-district", addDistrict)
router.get("/get-district", getDistrict)

module.exports = router;