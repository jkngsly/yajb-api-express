const userService = require("./user");
const bcrypt = require("bcryptjs");

module.exports = {
  isAuthenticated: (req) => {},

  register: async (params) => {
    //TODO: Form validation
    let salt = await bcrypt.genSalt(10);
    let user = {
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      password: await bcrypt.hash(params.password, salt),
    };

    return new Promise((resolve, reject) => {
      userService.create(user, (result) => {
        if (result) {
          resolve({
            success: true,
          });
        } else {
          reject({
            error: "Registration failed.",
            success: false,
          });
        }
      });
    });
  },

  login: async (email, password) => {
    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required.",
      };
    } else {
      return new Promise((resolve, reject) => {
        userService.findOne(
          {
            email: email,
          },
          async (result) => {
            if (result && (await bcrypt.compare(password, result.password))) {
              resolve({
                user: result,
                success: true,
              });
            } else {
              reject({
                error: "Invalid credentials provided.",
                success: false,
              });
            }
          },
          true
        );
      });
    }
  },

  logout: (req) => {},
};
