/**
 * Clase DTO que representa la petición de creación de un usuario
 * en la capa de aplicación.
 */
export class UserNewRequest {
  constructor(
    public fullName: string,
    public username: string,
    public password: string,
    public roleName: string
  ) {}

  /**
   * Valida que los campos requeridos no estén vacíos.
   * @throws Error
   */
  validate() {
    if (!this.fullName || !this.username || !this.password || !this.roleName) {
      throw new Error('All fields are required');
    }
  }
}
