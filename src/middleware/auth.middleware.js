const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ error: "Authorization token is missing or invalid" });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

module.exports = auth;
