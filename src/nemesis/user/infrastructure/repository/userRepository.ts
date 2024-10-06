import { PrismaClient } from '@prisma/client';
import { User } from "@/nemesis/user/domain/user";
import { IUserRepository } from "@/nemesis/user/domain/i-user-repository";

/**
 * Implementacion del repositorio de usuarios con Prisma
 */
export class UserRepository implements IUserRepository {
  private prisma;

  constructor(prisma?: PrismaClient) {
    if (prisma) {
      this.prisma = prisma;
    } else {
      this.prisma = new PrismaClient();
    }
  }


  /**
   * Guarda un usuario
   * @param user Usuario a guardar
   * @param roleName Nombre del rol a asignar al usuario
   * @returns Usuario guardado
   */
  async save( user: User, roleName: string ): Promise<any> {

    const role = await this.prisma.role.findUnique({where: {name: roleName}});
    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }

    return this.prisma.user.create({
      data: {
        fullName: user.fullName,
        username: user.username,
        passwordHash: user.passwordHash,
        salt: user.salt,
        role: {
          connect: {
            name: roleName
          }
        }
      },
      include: {
        role: true
      }
    });
  }
}
