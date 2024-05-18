const User = require("../models/user.model");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);

      if (!user) {
        return res
          .status(401)
          .send({ error: "Login failed! Check authentication credentials" });
      }

      res.send({
        user: { _id: user._id, role: user.role, ...user.toAuthJSON() },
      });
    } catch (error) {
      res.status(400).send({ error: "Login failed" });
    }
  }

  async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== req.token
      );
      await req.user.save();
      res.send({ message: "Logout Done!" });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async logoutAll(req, res) {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send({ message: "Logged out of all sessions" });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new AuthController();
