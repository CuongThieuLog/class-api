const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can't be blank"],
    },
    filePath: {
      type: String,
      required: [true, "File path can't be blank"],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;