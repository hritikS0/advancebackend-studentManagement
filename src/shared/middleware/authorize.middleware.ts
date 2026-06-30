import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new AppError(401, "Unauthorized");
    }
    if (!roles.includes(user.role)) {
      throw new AppError(
        403,
        "You don't have permission to perform this action",
      );
    }
    next();
  };
