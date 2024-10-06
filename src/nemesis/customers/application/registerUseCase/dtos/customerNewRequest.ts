import { CustomerStatus } from "@prisma/client";

export class CustomerNewRequest {
  constructor(
    public readonly documentType: string,
    public readonly documentNumber: string,
    public readonly name: string,
    public readonly registrationDate: Date,
    public readonly status: CustomerStatus,
    public readonly notes?: string,
    public readonly phone?: string,
    public readonly email?: string,
    public readonly activityCode?: string,
    public readonly activityDescription?: string
  ) {
  }

  static create(
    documentType: string,
    documentNumber: string,
    name: string,
    registrationDate: Date,
    status: CustomerStatus,
    notes?: string,
    phone?: string,
    email?: string,
    activityCode?: string,
    activityDescription?: string
  ): CustomerNewRequest {
    return new CustomerNewRequest(
      documentType,
      documentNumber,
      name,
      registrationDate,
      status,
      notes,
      phone,
      email,
      activityCode,
      activityDescription
    );
  }

  validate(): void {
    if (!this.documentType) {
      throw new Error('El tipo de documento es requerido.');
    }
    if (!this.documentNumber) {
      throw new Error('El número de documento es requerido.');
    }
    if (!this.name) {
      throw new Error('El nombre es requerido.');
    }
  }


}
