const controllers = require("../controllers/index.js");
const router = require("express").Router();
const middleware = require("../middleware/index.js");

// Global middleware
for (var global of middleware) {
  router.use("/", global);
}

// Auth
router.post("/login", controllers.auth.login);
router.post("/register", controllers.auth.register);

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

module.exports = router;
