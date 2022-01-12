const express = require("express");
const router = express.Router();

const { getAllRecord
} = require("../conrtollers/record.controller");

router.get("/allRecord", getAllRecord);

module.exports = router;
