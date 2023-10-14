module.exports = {
  validation: {
    error: "Please correct the errors below and try again",
    firstName: {
      required: "First name is required",
      invalid: "First name must be less than 30 characters",
    },
    lastName: {
      required: "Last name is required",
      invalid: "Last name must be less than 30 characters",
    },
    email: {
      unique:
        "The provided e-mail is already registered, please use the forgot password page to reset your login",
      required: "E-mail address is required",
      invalid: "The provided e-mail address is invalid",
    },
    password: {
      required: "Password is required",
      match: "Passwords do not match",
      invalid: "Password must be at least 8 characters long",
    },
    registration: {
      unhandled:
        "Registration failed, please contact support if you continue to experience issues",
    },
    login: {
      invalid: "Invalid credentials provided",
    },
  },
};
