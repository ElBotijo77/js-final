import { AuthRepository } from "../repositories/auth.repository";

// En proyecto real, reemplazar por bcrypt/argon2.
const fakeHash = (value: string) => `hash_${value}`;

export class AuthService {
  static async register(input: { username: string; email: string; password: string }) {
    const existing = await AuthRepository.findByEmail(input.email);
    if (existing) {
      throw new Error("Email already in use");
    }

    return AuthRepository.createUser({
      username: input.username,
      email: input.email,
      passwordHash: fakeHash(input.password),
    });
  }

  static async login(input: { email: string; password: string }) {
    const user = await AuthRepository.findByEmail(input.email);
    if (!user) return null;
    if (user.passwordHash !== fakeHash(input.password)) return null;
    return user;
  }
}
