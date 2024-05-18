const express = require("express");

const userRoute = require("./user.routes");
const authRoute = require("./auth.routes");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
