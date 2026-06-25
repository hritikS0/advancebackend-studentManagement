import type { Response } from "express";
interface SendResponseParams<T> {
  res: Response;
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
}

export const sendResponse = <T>({
  res,
  statusCode,
  success,
  message,
  data,
}: SendResponseParams<T>) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
