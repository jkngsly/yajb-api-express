const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

const sq = new Sequelize("yajb-node", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
});

const User = require("../models/user")(sq);

module.exports = {
  findOne: (params, callback, includePk) => {
    let attributes = {};
    if (includePk !== true) {
      attributes.exclude = ["id"];
    }

    User.findOne({
      where: params,
      attributes: attributes,
    }).then((result) => {
      callback(result);
    });
  },

  create: async (params, callback) => {
    User.create(params).then((result) => {
      callback(result);
    });
  },
};
