const { Sequelize } = require("sequelize");

module.exports = (db) => {
  const User = db.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      first_name: {
        type: Sequelize.STRING,
      },

      last_name: {
        type: Sequelize.STRING,
      },

      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return User;
};
