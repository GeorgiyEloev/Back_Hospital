const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const apiReceptionRoutes = require("./src/modules/routes/record.router");
const apiUserRoutes = require("./src/modules/routes/user.router");

const app = express();

app.use(cors());

const url =
  "mongodb+srv://user:user@cluster0.fiygj.mongodb.net/Hospital?retryWrites=true&w=majority";
mongoose.connect(url);

app.use(express.json());
app.use("/reception/", apiReceptionRoutes);
app.use("/user/", apiUserRoutes);

app.listen(8000, () => {
  console.log("listening on port 8000!");
});
