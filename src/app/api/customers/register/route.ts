import { NextResponse } from "next/server";
import { RegisterCustomer } from "@/nemesis/customers/application/registerUseCase/RegisterCustomer";
import { CustomerNewRequest } from "@/nemesis/customers/application/registerUseCase/dtos/customerNewRequest";
import { PrismaCustomerRepository } from "@/nemesis/customers/infrastructure/repositories/PrismaCustomerRepository";

const customerRepository = new PrismaCustomerRepository()
const useCase = new RegisterCustomer(customerRepository);


export async function POST( request: Request ) {

  const {
    documentType,
    documentNumber,
    name,
    phone,
    email,
    activityCode,
    activityDescription,
    status,
    notes
  } = await request.json();

  const useCaseRequest = CustomerNewRequest.create(
    documentType,
    documentNumber,
    name,
    phone,
    email,
    activityCode,
    activityDescription,
    status,
    notes
  );

  useCaseRequest.validate();

  const customerNew = await useCase.execute(useCaseRequest);

  return NextResponse.json(customerNew);

}
