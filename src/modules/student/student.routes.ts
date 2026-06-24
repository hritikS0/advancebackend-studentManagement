import { Router } from "express";
import { StudentController } from "./student.controller.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

const router = Router();

const controller = new StudentController();

router.get("/", asyncHandler(controller.getStudent.bind(controller)));
router.post("/", asyncHandler(controller.createStudent.bind(controller)));

export default router;
