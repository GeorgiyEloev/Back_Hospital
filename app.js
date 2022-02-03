const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const apiReceptionRoutes = require("./src/modules/routes/record.router");
const apiUserRoutes = require("./src/modules/routes/user.router");
require("dotenv").config();
const { PORT, UTL_BD } = process.env;
const app = express();

app.use(cors());

mongoose.connect(UTL_BD);

app.use(express.json());
app.use("/record/", apiReceptionRoutes);
app.use("/user/", apiUserRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
