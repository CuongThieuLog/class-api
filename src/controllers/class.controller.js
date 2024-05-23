const Class = require("../models/class.model");

class ClassController {
  async getAll(req, res) {
    try {
      const classes = await Class.find();
      res.status(200).json({ data: classes });
    } catch (error) {
      res.status(500).json({ message: "Error fetching classes", error });
    }
  }

  async getById(req, res) {
    try {
      const classId = req.params.id;
      const classData = await Class.findById(classId);
      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.status(200).json({ data: classData });
    } catch (error) {
      res.status(500).json({ message: "Error fetching class", error });
    }
  }

  async create(req, res) {
    try {
      const newClass = new Class(req.body);
      await newClass.save();
      res.status(201).json({ data: newClass });
    } catch (error) {
      res.status(400).json({ message: "Error creating class", error });
    }
  }

  async update(req, res) {
    try {
      const classId = req.params.id;
      const updatedClass = await Class.findByIdAndUpdate(classId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedClass) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.status(200).json({ data: updatedClass });
    } catch (error) {
      res.status(400).json({ message: "Error updating class", error });
    }
  }

  async remove(req, res) {
    try {
      const classId = req.params.id;
      const deletedClass = await Class.findByIdAndDelete(classId);
      if (!deletedClass) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting class", error });
    }
  }
}

module.exports = new ClassController();
