const {
  handleSequelizeException,
} = require("@helpers/sequelize-exception-handler");
const db = require("@config/database");
const Job = require("../models/job")(db);

module.exports = {
  get: async (job, filters) => {
    return new Promise(async (resolve, reject) => {
      let jobs = await Job.findAll();

      let result = {
        success: true,
        jobs: jobs,
        error: false,
        validationErrors: [],
      };

      resolve(result);
    });
  },

  create: async (job) => {
    return new Promise(async (resolve, reject) => {
      let _job = await Job.build({
        title: job.title,
        description: job.description,
        salary: job.salary,
        open: true,
        created_at: Date(),
      });

      _job.save().then((job) => {
        let result = {
          success: true,
          job: job,
          error: false,
          validationErrors: [],
        };

        resolve(result);
      });
    });
  },
};
