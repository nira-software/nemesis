
import { IUserRepository } from '@/nemesis/user/domain/i-user-repository';
import { IBcryptAdapter } from '@/nemesis/user/domain/i-bcrypt-adapter';
import { UserNewRequest } from '@/nemesis/user/application/dto/userNewRequest';
import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import { UserCase } from "@/nemesis/user/application/userCase";

describe('UserCase', () => {
  let userCase: UserCase;
  let userRepositoryMock: jest.Mocked<IUserRepository>;
  let bcryptAdapterMock: jest.Mocked<IBcryptAdapter>;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    bcryptAdapterMock = {
      generateSalt: jest.fn(),
      hashPassword: jest.fn(),
    } as unknown as jest.Mocked<IBcryptAdapter>;

    userCase = new UserCase(userRepositoryMock, bcryptAdapterMock);
  });

  it('Registrar un usuario nuevo satisfactoriamente.', async () => {
    const userRequest = new UserNewRequest('Administrador', 'admin', 'password123', 'admin');

    const savedUser = {
      id: 1,
      fullName: 'Administrador',
      username: 'admin',
      passwordHash: 'hashedpassword',
      salt: 'salt',
      role: { name: 'admin' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    bcryptAdapterMock.generateSalt.mockResolvedValue('salt');
    bcryptAdapterMock.hashPassword.mockResolvedValue('hashedpassword');
    userRepositoryMock.save.mockResolvedValue(savedUser);

    const result = await userCase.registerUser(userRequest);

    expect(result).toEqual({
      id: savedUser.id,
      fullName: userRequest.fullName,
      username: userRequest.username,
      roleName: userRequest.roleName,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    });
  });

  it('Lanza un error si la validación falla.', async () => {
    const userRequest = new UserNewRequest('', 'johndoe', 'password123', 'admin');

    await expect(userCase.registerUser(userRequest)).rejects.toThrow('All fields are required');
  });

  it('Lanza un error si no se encuentra el Rol', async () => {
    const userRequest = new UserNewRequest('John Doe', 'johndoe', 'password123', 'nonexistent');

    bcryptAdapterMock.generateSalt.mockResolvedValue('salt');
    bcryptAdapterMock.hashPassword.mockResolvedValue('hashedpassword');
    userRepositoryMock.save.mockRejectedValue(new Error('Role nonexistent not found'));

    await expect(userCase.registerUser(userRequest)).rejects.toThrow('Role nonexistent not found');
  });
});
