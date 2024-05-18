const teacher = async (req, res, next) => {
  try {
    if (req.user.role !== 1) {
      return res
        .status(403)
        .send({ error: "Access forbidden. Teacher role required." });
    }

    next();
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = teacher;
