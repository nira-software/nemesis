
import { Customer, CustomerStatus } from "@/nemesis/customers/domain/customer";
import { ICustomerRepository } from "@/nemesis/customers/domain/i-customer-repository";
import { CustomerNewRequest } from "@/nemesis/customers/application/registerUseCase/dtos/customerNewRequest";
import { CustomerNewResponse } from "@/nemesis/customers/application/registerUseCase/dtos/customerNewResponse";

export class RegisterCustomer {

  constructor(private readonly repository: ICustomerRepository) {
  }

  async execute(request: CustomerNewRequest): Promise<CustomerNewResponse> {
    const customer = new Customer(
      request.documentType,
      request.documentNumber,
      request.name,
      request.phone,
      request.email,
      request.activityCode,
      request.activityDescription,
      new Date(),
      CustomerStatus.ACTIVE,
      request.notes,
    );

    customer.validate();

    const customerNew = await this.repository.save(customer);
    return {
      documentType: customerNew.documentType,
      documentNumber: customerNew.documentNumber,
      name: customerNew.name,
      phone: customerNew.phone,
      email: customerNew.email,
      activityCode: customerNew.activityCode,
      activityDescription: customerNew.activityDescription,
      registrationDate: customerNew.registrationDate,
      status: customerNew.status,
      notes: customerNew.notes,
    }
  }
}


