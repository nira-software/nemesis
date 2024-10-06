// src/nemesis/user/domain/i-bcrypt-adapter.ts
export interface IBcryptAdapter {
  generateSalt(): Promise<string>;

  hashPassword( password: string, salt: string ): Promise<string>;

  comparePassword( password: string, hash: string ): Promise<boolean>;
}
