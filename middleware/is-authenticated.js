module.exports = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    var err = new Error("User is not authenticated");
    next(err);
  }
};
