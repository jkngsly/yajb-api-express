const { Sequelize } = require("sequelize");

module.exports = (db) => {
  const Job = db.define(
    "job",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.STRING,
      },

      salary: {
        type: Sequelize.INTEGER,
      },

      open: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },

      created_at: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: false,
    }
  );
  return Job;
};
