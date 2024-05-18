let router = require("express").Router();
let UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/all", auth, UserController.getAll);
router.get("/get-by-id/:id", auth, UserController.getById);
router.post("/create", auth, UserController.create);
router.put("/update/:id", auth, UserController.update);
router.delete("/delete/:id", auth, UserController.remove);

module.exports = router;
