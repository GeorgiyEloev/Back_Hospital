const Record = require("../../db/models/reception/recordSchema");

module.exports.getAllRecord = (req, res) => {
  Record.find()
    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      res.status(419).send("Error. An error occurred during the search!!!");
    });
};
