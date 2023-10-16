const userService = require("@services/user");
const constants = require("@config/constants");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  isAuthenticated: (req) => {},

  getAccessToken: (user_id) => {
    return jwt.sign(
      {
        id: user.id,
      },
      "sssssharedsecret",
      {
        expiresIn: 86400,
      }
    );
  },

  login: async (email, password) => {
    const _this = this;
    return new Promise((resolve, reject) => {
      userService.findOne(
        {
          email: email,
        },
        async (user) => {
          let result = {
            success: false,
            error: false,
            validationErrors: [],
          };

          if (user && (await bcrypt.compare(password, user.password))) {
            result.success = true;
            result.user = user;
            result.accessToken = jwt.sign(
              {
                id: user.id,
              },
              "sssssharedsecret",
              {
                expiresIn: 86400,
              }
            );
            resolve(result);
          } else {
            result.error = constants.validation.login.invalid;
            reject(result);
          }
        },
        true
      );
    });
  },

  register: async (newUser) => {
    let salt = await bcrypt.genSalt(10);
    let user = {
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      email: newUser.email,
      password: await bcrypt.hash(newUser.password, salt),
    };

    return new Promise((resolve, reject) => {
      userService.create(user, (user, validationErrors) => {
        let result = {
          success: false,
          error: false,
          validationErrors: [],
        };

        if (user) {
          result.success = true;
          resolve(result);
        } else {
          if (validationErrors.length) {
            result.error = validation.error;
            result.validationErrors = validationErrors;
          } else {
            result.error = constants.validation.registration.unhandled;
          }

          reject(result);
        }
      });
    });
  },

  logout: (req) => {},
};
