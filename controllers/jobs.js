const jobService = require("@services/job");

module.exports = {
  get: async (req, res) => {
    try {
      let result = await jobService.get();
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  },

  create: async (req, res) => {
    try {
      let result = await jobService.create(req.body.job);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  },
};
