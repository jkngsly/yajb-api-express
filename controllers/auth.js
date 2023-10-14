const authService = require("@services/auth");
const { respond } = require("@helpers/respond");

module.exports = {
  login: async (req, res) => {
    try {
      let result = await authService.login(req.body.email, req.body.password);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  },

  register: async (req, res) => {
    try {
      let result = await authService.register(req.body);

      res.json(result);
    } catch (err) {
      res.json(err);
    }
  },
};

/*logout: () => {},
  register: () => {},
  forgotPassword: () => {},
  resetPassword: () => {},
};
*/
