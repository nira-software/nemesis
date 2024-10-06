import bcrypt from 'bcrypt';
import { IBcryptAdapter } from "@/nemesis/user/domain/i-bcrypt-adapter";

/**
 * Bcrypt adapter para encriptar contraseñas
 */
export class BcryptAdapter implements IBcryptAdapter {

  /**
   * Genera un salt
   * @returns Salt
   */
  async generateSalt(): Promise<string> {
    return await bcrypt.genSalt(10);
  }

  /**
   * Hash de una contraseña
   * @param password contraseña
   * @param salt salt a utilizar
   * @returns Hash de la contraseña
   */
  async hashPassword( password: string, salt: string ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  /**
   * Comparar una contraseña con un hash
   * @param password Contraseña recibida
   * @param hash Hash a comparar
   * @returns true si la contraseña es correcta, false en caso contrario
   */
  async comparePassword( password: string, hash: string ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
