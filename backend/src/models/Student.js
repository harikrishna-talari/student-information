const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required."],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required."],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
