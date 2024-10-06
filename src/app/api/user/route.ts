import { NextResponse } from 'next/server';
import { UserRepository } from "@/nemesis/user/infrastructure/repository/userRepository";
import { BcryptAdapter } from "@/nemesis/user/infrastructure/adapter/bcryptAdapter";
import { UserCase } from "@/nemesis/user/application/userCase";
import { UserNewRequest } from "@/nemesis/user/application/dto/userNewRequest";
import { UseNewResponse } from "@/nemesis/user/application/dto/useNewResponse";


const userRepository = new UserRepository();
const bcryptAdapter = new BcryptAdapter();
const useCase = new UserCase(userRepository, bcryptAdapter);

export async function POST( request: Request ) {
  const {fullName, username, password, role} = await request.json();
  const userRequest = new UserNewRequest(fullName, username, password, role);

  const userNew: UseNewResponse = await useCase.registerUser(userRequest);
  return NextResponse.json(userNew);
}
