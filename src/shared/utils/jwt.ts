import jwt from "jsonwebtoken";

export const genrateAcessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  } as jwt.SignOptions);
};
