const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can't be blank"],
    },
    description: {
      type: String,
      required: [true, "Description can't be blank"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submissions: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        comments: [
          {
            teacher: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
            comment: {
              type: String,
              required: true,
            },
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
