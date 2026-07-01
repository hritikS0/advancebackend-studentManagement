import express from "express";
import studentRouter from "./modules/student/student.routes.js";
import { errorHandler } from "./shared/middleware/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";

// app
const app = express();

// middleware
app.use(express.json()); // pareses all the json bodies make data available in req.body
app.use(cookieParser());
// health
app.get("/health", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "Server is healthy",
  });
});
// routes
app.use("/students", studentRouter);
app.use("/auth", authRouter);
// config
app.use(errorHandler);
export default app;
