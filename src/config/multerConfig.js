const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "";

    if (req.user.role === 1) {
      uploadPath = "uploads/teachers/";
    } else if (req.user.role === 2) {
      uploadPath = "uploads/students/";
    } else {
      return cb(new Error("Invalid user role"), null);
    }

    fs.mkdir(uploadPath, { recursive: true }, function (err) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, uploadPath);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
