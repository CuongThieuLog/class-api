let router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");

router.get("/me", auth, AuthController.find);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", auth, AuthController.logout);
router.post("/logout-all", auth, AuthController.logoutAll);

module.exports = router;
