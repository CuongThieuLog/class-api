const admin = async (req, res, next) => {
  try {
    if (req.user.role !== 0) {
      return res
        .status(403)
        .send({ error: "Access forbidden. Admin role required." });
    }

    next();
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = admin;
