import { User } from "@/nemesis/user/domain/user";

/**
 * Contrato que se debe implementar para la gestion de usuarios.
 */
export interface IUserRepository {
  save( user: User, roleName: string ): Promise<any>;
}
