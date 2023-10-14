let types = ["unique violation"];

const handleSequelizeException = (err) => {
  let errors = [];

  err.errors.forEach((e) => {
    // Unique violation (email)
    if (e.type == types[0] && e.path == "email") {
      errors.push({
        path: "email",
        error: global.constants.validation.email.unique,
      });
    }
  });

  return errors;
};

module.exports = { handleSequelizeException };
