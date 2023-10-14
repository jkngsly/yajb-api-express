const { body, validationResult } = require("express-validator");
const constants = require("@config/constants");

let validationRules = {
  email: [
    body("email")
      .trim()
      .notEmpty()
      .withMessage(constants.validation.email.required)
      .isEmail()
      .withMessage(constants.validation.email.invalid)
      .normalizeEmail(),
  ],

  password: [
    body("password")
      .notEmpty()
      .withMessage(constants.validation.password.required)
      .isLength({ min: 8, max: 64 })
      .withMessage(constants.validation.password.invalid)
      .escape(),
  ],

  confirmPassword: body("confirmPassword").custom(
    async (confirmPassword, { req }) => {
      if (req.body.password !== confirmPassword) {
        throw new Error(constants.validation.password.match);
      }
    }
  ),

  fullName: [
    body("firstName")
      .notEmpty()
      .trim()
      .withMessage(constants.validation.firstName.required)
      .isLength({ min: 1, max: 30 })
      .withMessage(constants.validation.firstName.invalid)
      .escape(),

    body("lastName")
      .notEmpty()
      .trim()
      .withMessage(constants.validation.lastName.required)
      .isLength({ min: 1, max: 30 })
      .withMessage(constants.validation.lastName.invalid)
      .escape(),
  ],
};

validationRules.authenticate = [
  ...validationRules.email,
  ...validationRules.password,
];

validationRules.register = [
  ...validationRules.authenticate,
  ...validationRules.fullName,
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const validationErrors = [];
  errors.array().map((err) => {
    validationErrors.push({ [err.path]: err.msg });
  });

  return res.json({
    success: false,
    error: constants.validation.error,
    validationErrors: validationErrors,
  });
};

module.exports = { validationRules, validate };
