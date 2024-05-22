const router = require("express").Router();
const DocumentController = require("../controllers/document.controller");
const upload = require("../config/multerConfig");
const auth = require("../middleware/auth.middleware");
const teacher = require("../middleware/teacher.middleware");

router.get("/all", auth, DocumentController.getAll);
router.get("/get-by-id/:id", auth, DocumentController.getById);
router.post(
  "/create",
  auth,
  teacher,
  upload.single("file"),
  DocumentController.create
);
router.put(
  "/update/:id",
  auth,
  teacher,
  upload.single("file"),
  DocumentController.update
);
router.delete("/delete/:id", auth, teacher, DocumentController.remove);
router.get("/download/:id", auth, DocumentController.download);
router.post(
  "/submission-student/:id",
  auth,
  upload.single("file"),
  DocumentController.uploadSubmissionStudent
);

// router.get("/preview/:id/", DocumentController.preview);

module.exports = router;
