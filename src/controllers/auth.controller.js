const User = require("../models/user.model");

class AuthController {
  async find(req, res) {
    return res.send(req.user);
  }

  async register(req, res) {
    try {
      const { first_name, last_name, email, password, role } = req.body;
      const user = new User({ first_name, last_name, email, password, role });

      await user.save();
      return res.json({ user: user.toAuthJSON() });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

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
        user: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          ...user.toAuthJSON(),
        },
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
