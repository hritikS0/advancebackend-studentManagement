import { Router } from "express";
import { StudentController } from "./student.controller.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { StudentRepository } from "./student.repository.js";
import { StudentService } from "./student.service.js";
import { createStudentSchema, updateStudentSchema } from "./student.schema.js";
import { validate } from "../../shared/middleware/validation.middleware.js";
import { auth } from "../../shared/middleware/auth.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";

const router = Router();

const studentRepository = new StudentRepository();
// depency injections
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

router.post(
  "/",
  auth,
  authorize("ADMIN"),
  validate(createStudentSchema),
  asyncHandler(studentController.createStudent.bind(studentController)),
);
router.get(
  "/",
  authorize("ADMIN", "STUDENT"),
  auth,
  asyncHandler(studentController.getStudent.bind(studentController)),
);
router.get(
  "/:id",
  authorize("ADMIN", "STUDENT"),
  auth,
  asyncHandler(studentController.getStudentById.bind(studentController)),
);
router.patch(
  "/:id",

  auth,
  authorize("ADMIN"),
  validate(updateStudentSchema),
  asyncHandler(studentController.updateStudent.bind(studentController)),
);
router.delete(
  "/:id",
  authorize("ADMIN"),
  auth,
  authorize("ADMIN"),
  asyncHandler(studentController.deleteStudent.bind(studentController)),
);
export default router;
