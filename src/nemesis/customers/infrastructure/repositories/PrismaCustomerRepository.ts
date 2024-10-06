import { PrismaClient } from '@prisma/client';
import { Customer } from "@/nemesis/customers/domain/customer";
import { ICustomerRepository } from "@/nemesis/customers/domain/i-customer-repository";

export class PrismaCustomerRepository implements ICustomerRepository {
  private prisma = new PrismaClient();

  constructor(prisma?: PrismaClient) {
    if (prisma) {
      this.prisma = prisma;
    } else {
      this.prisma = new PrismaClient();
    }
  }

  /**
   * Guarda un nuevo cliente.
   * @param customer
   */
  async save(customer: Customer): Promise<any> {
    return this.prisma.customer.create({
      data: {
        documentType: customer.documentType,
        documentNumber: customer.documentNumber,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        activityCode: customer.activityCode,
        activityDescription: customer.activityDescription,
        registrationDate: customer.registrationDate,
        status: customer.status,
        notes: customer.notes,
      },
    });
  }
}
