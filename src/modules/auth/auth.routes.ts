import { Router } from "express";
import { UserRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../shared/middleware/validation.middleware.js";
import { loginSchema, refreshTokenSchema, registerSchema } from "./auth.schema.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register.bind(authController)),
);
router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.loginUser.bind(authController)),
);
router.post(
  "/refresh",
  validate(refreshTokenSchema),
  asyncHandler(authController.refreshToken.bind(authController)),
);

export default router;
