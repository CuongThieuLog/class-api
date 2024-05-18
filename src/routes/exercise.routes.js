let router = require("express").Router();
const ExerciseController = require("../controllers/exercise.controller");
const auth = require("../middleware/auth.middleware");

router.post("/create", auth, ExerciseController.createExercise);
router.post("/submit", auth, ExerciseController.studentSubmit);
router.post("/comment", auth, ExerciseController.createComments);
router.get("/all", auth, ExerciseController.getAll);
router.get("/get-by-id/:id", auth, ExerciseController.getById);
router.delete("/delete/:id", auth, ExerciseController.remove);

module.exports = router;
