let router = require("express").Router();
const ClassController = require("../controllers/class.controller");
const auth = require("../middleware/auth.middleware");
const teacher = require("../middleware/teacher.middleware");

router.get("/all", auth, ClassController.getAll);
router.get("/get-by-id/:id", auth, ClassController.getById);
router.post("/create", auth, ClassController.create);
router.put("/update/:id", auth, ClassController.update);
router.delete("/delete/:id", auth, ClassController.remove);

module.exports = router;
