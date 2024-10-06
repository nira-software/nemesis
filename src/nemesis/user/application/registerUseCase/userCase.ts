import { User } from "@/nemesis/user/domain/user";
import { IUserRepository } from "@/nemesis/user/domain/i-user-repository";
import { IBcryptAdapter } from "@/nemesis/user/domain/i-bcrypt-adapter";
import { UserNewRequest } from "@/nemesis/user/application/registerUseCase/dto/userNewRequest";
import { UseNewResponse } from "@/nemesis/user/application/registerUseCase/dto/useNewResponse";


/**
 * Caso de uso para la gestión de usuarios.
 */
export class UserCase {
  constructor( private userRepository: IUserRepository, private bcryptAdapter: IBcryptAdapter ) {
  }

  /**
   * Registra un nuevo usuario.
   * @returns Información del usuario registrado.
   * @param userRequest Datos del usuario a registrar.
   */
  async registerUser( userRequest: UserNewRequest ): Promise<UseNewResponse> {
    userRequest.validate();

    const { fullName, username, password, roleName } = userRequest;
    const salt = await this.bcryptAdapter.generateSalt();
    const passwordHash = await this.bcryptAdapter.hashPassword(password, salt);

    const newUser = User.create(fullName, username, passwordHash, salt, roleName);
    const savedUser = await this.userRepository.save(newUser, roleName);

    return {
      id: savedUser.id,
      fullName: savedUser.fullName,
      username: savedUser.username,
      roleName: savedUser.role.name,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt
    }

  }
}
