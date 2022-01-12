const express = require("express");
const router = express.Router();

const {
  getAllRecord,
  addNewRecord,
} = require("../conrtollers/record.controller");

router.get("/allRecord", getAllRecord);
router.post("/addNewRecord", addNewRecord);

module.exports = router;
