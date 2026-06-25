import type { Request, Response } from "express";
import type { AuthService } from "./auth.service.js";
import { sendResponse } from "../../shared/utils/sendResponse.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response) {
    const user = await this.authService.registerUser(req.body);
    sendResponse({
      res,
      statusCode: 201,
      success: true,
      message: "User created!",
      data: user,
    });
  }
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.authService.loginUser({ email, password });
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      data: user,
    });
  }
}
