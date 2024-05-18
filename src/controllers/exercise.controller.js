const Exercise = require("../models/exercise.model");

class ExerciseController {
  async createExercise(req, res) {
    const { title, description } = req.body;
    const createdBy = req.user._id;

    try {
      const exercise = new Exercise({ title, description, createdBy });
      await exercise.save();
      res.status(201).json({ data: exercise });
    } catch (error) {
      console.error("Error creating exercise:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async studentSubmit(req, res) {
    const { exerciseId, content } = req.body;
    const studentId = req.user._id;

    try {
      const exercise = await Exercise.findById(exerciseId);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      exercise.submissions.push({
        student: studentId,
        content: content,
      });

      await exercise.save();
      res.status(200).json({ message: "Exercise submitted successfully" });
    } catch (error) {
      console.error("Error submitting exercise:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createComments(req, res) {
    const { exerciseId, submissionId, comment } = req.body;
    const teacherId = req.user._id;

    try {
      const exercise = await Exercise.findById(exerciseId);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      const submission = exercise.submissions.id(submissionId);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }

      submission.comments.push({ teacher: teacherId, comment });
      await exercise.save();
      res.status(200).json({ message: "Comment added successfully" });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const exercises = await Exercise.find();
      res.status(200).json({ data: exercises });
    } catch (error) {
      console.error("Error getting exercises:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    const exerciseId = req.params.id;

    try {
      const exercise = await Exercise.findById(exerciseId);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      res.status(200).json({ data: exercise });
    } catch (error) {
      console.error(`Error getting exercise with id ${exerciseId}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async remove(req, res) {
    const exerciseId = req.params.id;

    try {
      const exercise = await Exercise.findByIdAndUpdate(exerciseId);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      res.status(200).json({ message: "Exercise deleted successfully" });
    } catch (error) {
      console.error(`Error deleting exercise with id ${exerciseId}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new ExerciseController();
