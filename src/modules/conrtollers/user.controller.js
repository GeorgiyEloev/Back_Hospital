const crypto = require("crypto");
const _ = require("lodash");
const User = require("../../db/models/user/userSchema");
const tokenService = require("../service/token-service");

module.exports.addNewUser = (req, res, next) => {
  User.findOne({ login: req.body.login }).then((result) => {
    if (!result) {
      if (
        req.body.hasOwnProperty("login") &&
        req.body.hasOwnProperty("password") &&
        req.body.password.trim() &&
        req.body.login.trim()
      ) {
        const user = new User(req.body);
        user.password = crypto
          .createHash("sha256")
          .update(user.password)
          .digest("base64");
        user.save().then(() => {
          const { _id, login } = user;
          const userNotPassword = {
            _id,
            login,
          };
          const token = tokenService.generateToken({ ...userNotPassword });
          res.send({ data: { login }, token });
        });
      } else {
        res.status(422).send("Error, incorrect data!!!");
      }
    } else {
      res.status(420).send("Error, login is busy!!!");
    }
  });
};
