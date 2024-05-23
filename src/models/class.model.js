const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: [true, "Class name can't be blank"],
    },
    schedule: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },
        startTime: {
          type: String,
          required: true,
          validate: {
            validator: function (v) {
              return /^\d{2}:\d{2}$/.test(v);
            },
            message: (props) =>
              `${props.value} is not a valid time format! Use HH:mm format.`,
          },
        },
        endTime: {
          type: String,
          required: true,
          validate: {
            validator: function (v) {
              return /^\d{2}:\d{2}$/.test(v);
            },
            message: (props) =>
              `${props.value} is not a valid time format! Use HH:mm format.`,
          },
        },
      },
    ],
    deadlines: [
      {
        title: {
          type: String,
          required: [true, "Deadline title can't be blank"],
        },
        description: {
          type: String,
          required: [true, "Deadline description can't be blank"],
        },
        dueDate: {
          type: Date,
          required: [true, "Due date can't be blank"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
