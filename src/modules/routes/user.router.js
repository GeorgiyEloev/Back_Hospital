const express = require("express");
const router = express.Router();

const { addNewUser } = require("../conrtollers/user.controller");

router.post("/addNewUser", addNewUser);

module.exports = router;
