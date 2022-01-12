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

module.exports.addNewRecord = (req, res) => {
  const { authorization } = req.headers;
  const { patient, doctor, symptoms } = req.body;
  jwt.verify(authorization, process.env.JWT_KEY, (err, data) => {
    if (err) return res.status(401).send("Error, corrupted token!!!");
    if (
      req.body.hasOwnProperty("patient") &&
      req.body.patient.trim() &&
      req.body.hasOwnProperty("doctor") &&
      req.body.doctor.trim() &&
      req.body.hasOwnProperty("symptoms") &&
      req.body.symptoms.trim()
    ) {
      const recordNew = {
        userId: data._id,
        patient,
        doctor,
        symptoms,
      };
      const record = new Record(recordNew);
      record
        .save()
        .then((result) => {
          const { userId } = result;
          Record.find({ userId })
            .then((result) => {
              res.send({ data: result });
            })
            .catch((err) => {
              res
                .status(419)
                .send("Error. An error occurred during the search!!!");
            });
        })
        .catch((err) => {
          res.status(421).send("Error, record doesn't save!!!");
        });
    } else {
      res.status(422).send("Error, incorrect data!!!");
    }
  });
};

module.exports.removeRecord = (req, res) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, process.env.JWT_KEY, (err) => {
    if (err) return res.status(401).send("Error, corrupted token!!!");
    const id = req.body._id;
    Record.deleteOne({ _id: id })
      .then((result) => {
        if (result.deletedCount) {
          Record.find().then((result) => {
            res.send({ data: result });
          });
        } else {
          res.status(404).send("Error, record does not exist!!!");
        }
      })
      .catch((err) => {
        res.status(419).send("Error. An error occurred during the delete!!!");
      });
  });
};
