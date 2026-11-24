require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/students");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/students", studentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Request body must be valid JSON." });
  }

  console.error(error);
  return res.status(500).json({ message: "An unexpected server error occurred." });
});

async function start() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Add it to backend/.env.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  app.listen(port, () => {
    console.log(`Student API listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Could not start the server:", error.message);
  process.exitCode = 1;
});
