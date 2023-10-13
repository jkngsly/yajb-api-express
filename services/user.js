const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const {
  handleSequelizeException,
} = require("@helpers/sequelize-exception-handler");

const sq = new Sequelize("yajb-node", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
});

const User = require("../models/user")(sq);

module.exports = {
  findOne: async (user, callback, includePk) => {
    let attributes = {};
    if (includePk !== true) {
      attributes.exclude = ["id"];
    }

    User.findOne({
      where: user,
      attributes: attributes,
    }).then((result) => {
      callback(result);
    });
  },

  create: async (user, callback) => {
    User.create(user)
      .catch(function (err) {
        callback(false, handleSequelizeException(err));
      })
      .then((result) => {
        callback(result);
      });
  },
};
