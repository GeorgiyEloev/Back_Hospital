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
  jwt.verify(authorization, process.env.JWT_KEY, (err, data) => {
    if (err) return res.status(401).send("Error, corrupted token!!!");
    const id = req.body._id;
    Record.deleteOne({ _id: id })
      .then((result) => {
        if (result.deletedCount) {
          const userId = data._id;
          Record.find({ userId })
            .then((result) => {
              res.send({ data: result });
            })
            .catch((err) => {
              res
                .status(419)
                .send("Error. An error occurred during the search!!!");
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

module.exports.changeRecord = (req, res) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, process.env.JWT_KEY, (err, data) => {
    if (err) return res.status(401).send("Error, corrupted token!!!");

    const body = req.body;
    const recordUpdate = {};

    if (body.hasOwnProperty("_id") && body._id.trim()) {
      recordUpdate._id = body._id.trim();
      recordUpdate.userId = data._id;
      if (body.hasOwnProperty("patient") && body.patient.trim()) {
        recordUpdate.patient = body.patient.trim();
      }
      if (body.hasOwnProperty("doctor") && body.doctor.trim()) {
        recordUpdate.doctor = body.doctor.trim();
      }
      if (body.hasOwnProperty("date") && body.date.trim()) {
        recordUpdate.date = body.date.trim();
      }
      if (body.hasOwnProperty("symptoms") && body.symptoms.trim()) {
        recordUpdate.symptoms = body.symptoms.trim();
      }
      Record.updateOne({ _id: recordUpdate._id }, recordUpdate)
        .then((result) => {
          const userId = data._id;
          Record.find({ userId })
            .then((result) => {
              res.send({ data: result });
            })
            .catch((err) => {
              res
                .status(419)
                .send("Error. An error occurred during the search!!!");
            })
        })
        .catch((err) => {
          res.status(419).send("Error. An error occurred during the update!!!");
        });
    } else {
      res.status(422).send("Error! Invalid ID!!!!");
    }
  });
};
