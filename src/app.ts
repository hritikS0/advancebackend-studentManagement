import express from "express";
import studentRouter from "./modules/student/student.routes.js";
import { errorHandler } from "./shared/middleware/error.middleware.js";
// app
const app = express();

// middleware
app.use(express.json()); // pareses all the json bodies make data available in req.body

// health
app.get("/health", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "Server is healthy",
  });
});
// routes
app.use("/students", studentRouter);

// config
app.use(errorHandler);
export default app;
