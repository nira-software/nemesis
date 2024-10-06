/**
 * Modelo que representa un usuario
 */
export class User {

  /**
   * Constructor
   * @param fullName Nombre completo del usuario
   * @param username Nombre de usuario
   * @param passwordHash Contraseña encriptada
   * @param salt Sal para encriptar la contraseña
   * @param role Rol del usuario
   */
  constructor(
    public fullName: string,
    public username: string,
    public passwordHash: string,
    public salt: string,
    public role: string
  ) {
  }

  /**
   * Crear un nuevo usuario
   * @param fullName Nombre completo del usuario
   * @param username Nombre de usuario
   * @param passwordHash Contraseña encriptada
   * @param salt Sal para encriptar la contraseña
   * @param role Rol del usuario
   */
  static create( fullName: string, username: string, passwordHash: string, salt: string, role: string ) {
    return new User(fullName, username, passwordHash, salt, role);
  }
}
