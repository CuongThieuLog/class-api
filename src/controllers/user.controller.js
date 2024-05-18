const User = require("../models/user.model");

class UserController {
  async find(req, res) {
    return res.send(req.user);
  }

  async register(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;
      const user = new User({ first_name, last_name, email, password });

      await user.save();
      return res.json({ user: user.toAuthJSON() });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new UserController();
