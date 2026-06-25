import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";

export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req.body);

    next();
  };
