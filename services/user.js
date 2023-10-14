const bcrypt = require("bcryptjs");
const {
  handleSequelizeException,
} = require("@helpers/sequelize-exception-handler");
const db = require("@config/database");
const User = require("../models/user")(db);

module.exports = {
  findOne: async (user, callback, includePk) => {
    let attributes = {};
    if (includePk !== true) {
      attributes.exclude = ["id"];
    }

    User.findOne({
      where: user,
      attributes: attributes,
    }).then((user) => callback(user));
  },

  create: async (user, callback) => {
    User.create(user)
      .catch(function (err) {
        callback(false, handleSequelizeException(err));
      })
      .then((user) => callback(user));
  },
};
