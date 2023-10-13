const users = require("@controllers/users");
const jobs = require("@controllers/jobs");
const auth = require("@controllers/auth");

module.exports = {
  users: users,
  jobs: jobs,
  auth: auth,
};
