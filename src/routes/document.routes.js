const router = require("express").Router();
const DocumentController = require("../controllers/document.controller");
const upload = require("../config/multerConfig");
const auth = require("../middleware/auth.middleware");

router.post("/all", auth, DocumentController.getAll);
router.post("/:id", auth, DocumentController.getById);
router.post("/create", auth, upload.single("file"), DocumentController.create);
router.put("/:id", auth, upload.single("file"), DocumentController.update);
router.delete("/:id", auth, DocumentController.remove);
router.get("/download/:id", auth, DocumentController.download);

module.exports = router;
