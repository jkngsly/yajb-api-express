const controllers = require("@controllers");
const router = require("express").Router();
const middleware = require("@middleware");
const { validationRules, validate } = require("@helpers/validator");
const jwtConfig = require("@config/jwt");
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  let excludedPaths = ["/login", "/register", "/jobs", "/job"];

  if (excludedPaths.indexOf(req.path) === -1) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      jwtConfig.secret,
      function (err, decoded) {
        next();
      }
    );
  } else {
    next();
  }
});

// Auth
router.post(
  "/login",
  validationRules.authenticate,
  validate,
  controllers.auth.login
);

router.post(
  "/register",
  validationRules.register,
  validate,
  controllers.auth.register
);

/*router.get("/logout", controllers.auth.logout);
router.post("/forgot-password", controllers.auth.forgotPassword);
router.post("/reset-password", controllers.auth.resetPassword);
*/
// User
router.get("/users", controllers.users.get);
router.get("/users/:id", controllers.users.getById);
router.post("/users", controllers.users.create);
router.put("/users/:id", controllers.users.update);
router.delete("/users/:id", controllers.users.delete);

// Jobs
router.get("/jobs", controllers.jobs.get);
router.post("/job", controllers.jobs.create);

/*
router.get("/jobs/:id", controllers.jobs.getById);
router.post("/jobs", controllers.jobs.create);
router.put("/jobs/:id", controllers.jobs.update);
router.delete("/jobs/:id", controllers.jobs.delete);
*/

router.all("/checklogin", (req, res) =>
  res.status(req.session.uid ? 200 : 401).send("OK")
);

module.exports = router;
