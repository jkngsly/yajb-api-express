const controllers = require("@controllers");
const router = require("express").Router();
const middleware = require("@middleware");
const { validationRules, validate } = require("@helpers/validator");
const { expressjwt: jwt } = require("express-jwt");

// JWT
router.use(
  jwt({
    secret: "shhhhhhared-secret",
    algorithms: ["HS256"],
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  }).unless({
    path: ["/register", "/login", "/forgot-password", "reset-password"],
  })
);

router.get(
  "/protected",
  jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),
  function (req, res) {
    if (!req.auth.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);

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
router.get("/jobs/:id", controllers.jobs.getById);
router.post("/jobs", controllers.jobs.create);
router.put("/jobs/:id", controllers.jobs.update);

router.delete("/jobs/:id", controllers.jobs.delete);

router.all("/checklogin", (req, res) =>
  res.status(req.session.uid ? 200 : 401).send("OK")
);

module.exports = router;
