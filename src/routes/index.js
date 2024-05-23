const express = require("express");

const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");
const documentRoute = require("./document.routes");
const exerciseRoute = require("./exercise.routes");
const classRoute = require("./class.routes");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/document", documentRoute);
router.use("/exercise", exerciseRoute);
router.use("/class", classRoute);

module.exports = router;
