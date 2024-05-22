const User = require("../models/user.model");
const bcrypt = require("bcrypt");

class UserController {
  async getAll(req, res) {
    try {
      const users = await User.find().select(
        "_id first_name last_name email role"
      );
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id).select(
        "_id first_name last_name email role"
      );
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req, res) {
    const { first_name, last_name, email, password, role } = req.body;
    const defaultPassword = "class@123";
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password || defaultPassword, 8);

      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();

      res.status(201).json({ data: newUser });
    } catch (error) {
      res.status(400).json({ error: "Bad Request" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const updates = req.body;
    try {
      const user = await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(400).json({ error: "Bad Request" });
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new UserController();
