let router = require("express").Router();
let UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

router.get("/all", auth, admin, UserController.getAll);
router.get("/get-by-id/:id", auth, admin, UserController.getById);
router.post("/create", auth, admin, UserController.create);
router.put("/update/:id", auth, admin, UserController.update);
router.delete("/delete/:id", auth, admin, UserController.remove);

module.exports = router;
