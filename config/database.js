const Sequelize = require("sequelize");

const config = {
  host: "localhost",
  name: "yabj-node",
  user: "postgres",
  password: "123456",
  dialect: "postgres",
};

module.exports = new Sequelize(config.name, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
});
