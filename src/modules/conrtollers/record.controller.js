const jwt = require("jsonwebtoken");
const Record = require("../../db/models/reception/recordSchema");

module.exports.getAllRecord = (req, res) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, process.env.JWT_KEY, (err, data) => {
    if (err) return res.status(401).send("Error, corrupted token!!!");
    Record.find({ userId: data._id })
      .then((result) => {
        res.send({ data: result });
      })
      .catch((err) => {
        res.status(419).send("Error. An error occurred during the search!!!");
      });
  });
};
