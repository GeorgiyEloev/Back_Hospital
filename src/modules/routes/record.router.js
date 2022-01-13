const express = require("express");
const router = express.Router();

const {
  getAllRecord,
  addNewRecord,
  removeRecord,
} = require("../conrtollers/record.controller");

router.get("/allRecord", getAllRecord);
router.post("/addNewRecord", addNewRecord);
router.delete("/removeRecord", removeRecord);

module.exports = router;
