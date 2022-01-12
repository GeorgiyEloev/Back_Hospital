const Record = require("../../db/models/reception/recordSchema");

module.exports.getAllRecord = (req, res) => {
	const {userId} =req.body
  Record.find({userId})
    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      res.status(419).send("Error. An error occurred during the search!!!");
    });
};
