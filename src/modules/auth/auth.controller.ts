import type { Request, Response } from "express";
import type { AuthService } from "./auth.service.js";
import { sendResponse } from "../../shared/utils/sendResponse.js";
import { AppError } from "../../shared/errors/AppError.js";

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
    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      data: user,
    });
  }
  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!refreshToken) {
      throw new AppError(400, "Refresh token is required");
    }

    const tokens = await this.authService.refreshAccessToken(refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Token refreshed successfully",
      data: tokens,
    });
  }
  async me(req: Request, res: Response) {
    const userId = req.user.id;
    console.log(userId, "Controller");
    const user = await this.authService.getCurrentUser(userId);

    sendResponse({
      res,
      statusCode: 200,
      success: true,
      data: user,
    });
  }
  async logout(req: Request, res: Response) {
    await this.authService.logout();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Logged out successfully",
    });
  }
}
