import { AppError } from "../../shared/errors/AppError.js";
import type { UserRepository } from "./auth.repository.js";
import type { LoginDto, RegisterDto } from "./auth.types.js";
import bcrypt from "bcryptjs";
import {
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
} from "../../shared/utils/jwt.js";
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(data: RegisterDto) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError(409, "User already exists");
    }
    const hasedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.createUser({
      ...data,
      password: hasedPassword,
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  async loginUser(data: LoginDto) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, "Invalid email or password");
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  async refreshAccessToken(refreshToken: string) {
    let decoded: { id: string; email: string; role: string };

    try {
      decoded = verifyRefreshToken(refreshToken) as {
        id: string;
        email: string;
        role: string;
      };
    } catch {
      throw new AppError(401, "Invalid or expired refresh token");
    }

    const user = await this.userRepository.findByEmail(decoded.email);
    if (!user) {
      throw new AppError(401, "User not found");
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "User not found");
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  async logout() {
    return;
  }
}
