const userService = require("./user");
const bcrypt = require("bcryptjs");

module.exports = {
  isAuthenticated: (req) => {},

  register: async (params) => {
    console.log(params);
    //TODO: Form validation
    let salt = await bcrypt.genSalt(10);
    let user = {
      first_name: params.firstName,
      last_name: params.lastName,
      email: params.email,
      password: await bcrypt.hash(params.password, salt),
    };

    if (!params.email || !params.password) {
      return {
        success: false,
        error: "Email and password are required.",
      };
    }

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
