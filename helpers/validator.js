const { body, validationResult } = require("express-validator");

let validationRules = {
  email: [
    body("email")
      .notEmpty()
      .withMessage("E-mail is required")
      .isEmail()
      .withMessage("The e-mail provided is invalid")
      .normalizeEmail(),
  ],

  password: [
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be at least 8 characters long")
      .escape(),
  ],

  fullName: [
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 1, max: 30 })
      .withMessage("First name must be between 1 and 30 characters")
      .escape(),

    body("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 1, max: 30 })
      .withMessage("Last name must be between 1 and 30 characters")
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
  const extractedErrors = [];
  errors.array().map((err) => {
    extractedErrors.push({ [err.path]: err.msg });
  });

  return res.json({
    success: false,
    error: "Please correct the invalid entries and try again",
    validationErrors: extractedErrors,
  });
};

module.exports = { validationRules, validate };
