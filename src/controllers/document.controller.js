const Document = require("../models/document.model");
const fs = require("fs");

class DocumentController {
  async getAll(req, res) {
    try {
      const { type } = req.query;

      let query = {};
      if (type) {
        query.type = type;
      }

      const documents = await Document.find(query)
        .populate({
          path: "uploadedBy",
          select: "_id first_name last_name email role",
        })
        .populate({
          path: "submissions.student",
          select: "_id first_name last_name email role",
        });
      res.json({ data: documents });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const document = await Document.findById(id)
        .populate({
          path: "uploadedBy",
          select: "_id first_name last_name email role",
        })
        .populate({
          path: "submissions.student",
          select: "_id first_name last_name email role",
        });

      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      res.json({ data: document });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const { title, type } = req.body;
      const uploadedBy = req.user._id;
      const filePath = req.file.path;

      const document = new Document({ title, filePath, type, uploadedBy });
      await document.save();

      res.status(201).json({ data: document });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, type } = req.body;

      let document = await Document.findById(id);

      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      if (req.file) {
        const filePath = document.filePath;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }

        document.filePath = req.file.path;
      }

      document.title = title;
      document.type = type;

      await document.save();

      res.json({ data: document });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;

      const document = await Document.findById(id);

      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      const filePath = document.filePath;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await document.deleteOne();

      res.json({ message: "Document deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async download(req, res) {
    try {
      const { id } = req.params;

      const document = await Document.findById(id);

      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      const filePath = document.filePath;

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      res.download(filePath, (err) => {
        if (err) {
          res.status(500).json({ error: "Failed to download file" });
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async uploadSubmissionStudent(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const uploadedBy = req.user._id;
      const filePath = req.file.path;

      const document = await Document.findById(id);

      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      const newSubmission = {
        student: uploadedBy,
        filePath: filePath,
        content: content,
      };

      document.submissions.push(newSubmission);
      await document.save();

      res.status(201).json({
        message: "Submission student uploaded successfully",
        data: newSubmission,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async downloadSubmissionFile(req, res) {
    try {
      const { documentId, submissionId } = req.params;

      const document = await Document.findById(documentId);
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      const submission = document.submissions.id(submissionId);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }

      const filePath = submission.filePath;

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      res.download(filePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Failed to download file" });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new DocumentController();
