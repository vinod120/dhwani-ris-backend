const express = require("express");
const router = express.Router();
const { getUsers, addUser, userLogin, userLogout, getState, postState, getDistrict, postDistrict } = require("../controllers/user-controller");
const verify = require('../verfiyToken');

router.get("/", getUsers);
router.post("/register", addUser);
router.post("/login", userLogin)
router.get("/logout", verify, userLogout)
router.get("/get/state", verify, getState)
router.post("/post/state", verify, postState)
router.get("/get/district", verify, getDistrict)
router.post("/post/district", verify, postDistrict)

module.exports = router;