const Document = require("../models/document.model");
const fs = require("fs");

class DocumentController {
  async getAll(req, res) {
    try {
      const documents = await Document.find();
      res.json({ data: documents });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const document = await Document.findById(id);

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
      const { title } = req.body;
      const uploadedBy = req.user._id;
      const filePath = req.file.path;

      const document = new Document({ title, filePath, uploadedBy });
      await document.save();

      res.status(201).json({ data: document });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;

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

      await document.remove();

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
}

module.exports = new DocumentController();
