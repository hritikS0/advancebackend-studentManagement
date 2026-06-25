import { AppError } from "../../shared/errors/AppError.js";
import type { UserRepository } from "./auth.repository.js";
import type { LoginDto, RegisterDto } from "./auth.types.js";
import bcrypt from "bcryptjs";
import { genrateAcessToken } from "../../shared/utils/jwt.js";
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
      throw new AppError(404, "Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, "Invalid email or password");
    }
    const token = genrateAcessToken({
      user: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }
}
