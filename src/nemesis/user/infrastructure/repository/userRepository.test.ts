import { prismaMock } from "@/__test__/singleton";
import { UserRepository } from "@/nemesis/user/infrastructure/repository/userRepository";
import { User } from "@/nemesis/user/domain/user";


test("save user", async () => {

  prismaMock.role.findUnique.mockResolvedValue({
    "id": 1,
    "name": "admin"
  });
  prismaMock.user.create.mockResolvedValue({
    id: "8ea712cb-2e84-4543-a132-27ae0008ffa7",
    fullName: "Administrador",
    username: "admin3",
    passwordHash: "$2b$10$fgS2z3Q0gYtSjEZG5FMMeuFDS.ShY4zwrRj9xm9S2RGVyxoh/gKbS",
    salt: "$2b$10$fgS2z3Q0gYtSjEZG5FMMeu",
    roleId: 1,
    createdAt: new Date("2024-09-23 06:36:29.821"),
    updatedAt: new Date("2024-09-23 06:36:29.821")
  });

  const service = new UserRepository(prismaMock);
  const newUser = User.create(
    "Administrador",
    "admin3",
    "$2b$10$fgS2z3Q0gYtSjEZG5FMMeuFDS.ShY4zwrRj9xm9S2RGVyxoh/gKbS",
    "$2b$10$fgS2z3Q0gYtSjEZG5FMMeu",
    "admin");

  await expect(service.save(newUser, "admin")).resolves.toEqual({
    id: "8ea712cb-2e84-4543-a132-27ae0008ffa7",
    fullName: "Administrador",
    username: "admin3",
    passwordHash: "$2b$10$fgS2z3Q0gYtSjEZG5FMMeuFDS.ShY4zwrRj9xm9S2RGVyxoh/gKbS",
    salt: "$2b$10$fgS2z3Q0gYtSjEZG5FMMeu",
    roleId: 1,
    createdAt: new Date("2024-09-23 06:36:29.821"),
    updatedAt: new Date("2024-09-23 06:36:29.821")
  })
})
