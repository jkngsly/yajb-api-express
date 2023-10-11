module.exports = (req, res, next) => {
  console.log("-------");
  console.log("Time:", Date.now());
  console.log("Request URL:", req.originalUrl);
  console.log("Request Type:", req.method);
  next();
};
