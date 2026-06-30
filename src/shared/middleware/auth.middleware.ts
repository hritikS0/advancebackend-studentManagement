import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(401, "Unauthorized");
  }
  const [scheme, accessToken] = token.split(" ");
  if (scheme !== "Bearer" || !accessToken) {
    throw new AppError(401, "Invalid authorization header");
  }

  try {
    const decoded = verifyAccessToken(accessToken);
    req.user = decoded;
    next();
  } catch {
    throw new AppError(401, "Invalid Token");
  }
};
