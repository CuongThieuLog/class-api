const router = require("express").Router();
const DocumentController = require("../controllers/document.controller");
const upload = require("../config/multerConfig");
const auth = require("../middleware/auth.middleware");

router.get("/all", auth, DocumentController.getAll);
router.get("/get-by-id/:id", auth, DocumentController.getById);
router.post("/create", auth, upload.single("file"), DocumentController.create);
router.put(
  "/update/:id",
  auth,
  upload.single("file"),
  DocumentController.update
);
router.delete("/delete/:id", auth, DocumentController.remove);
router.get("/download/:id", auth, DocumentController.download);

module.exports = router;
