let types = ["unique violation"];

const handleSequelizeException = (err) => {
  let errors = [];

  err.errors.forEach((e) => {
    // Unique violation (email)
    if (e.type == types[0] && e.path == "email") {
      errors.push({
        path: "email",
        error:
          "The provided e-mail is already registered, please use the forgot password page to reset your login",
      });
    }
  });

  return errors;
};

module.exports = { handleSequelizeException };
