// /domain/entities/Customer.ts
export class Customer {
  constructor(
    public readonly documentType: string,
    public readonly documentNumber: string,
    public readonly name: string,
    public readonly phone?: string,
    public readonly email?: string,
    public readonly activityCode?: string,
    public readonly activityDescription?: string,
    public readonly registrationDate: Date = new Date(),
    public readonly status: CustomerStatus = CustomerStatus.ACTIVE,
    public readonly notes?: string,
  ) {}

  // Reglas de negocio pueden ir aquí, por ejemplo:
  validate() {
    if (!this.documentNumber || !this.documentType || !this.name) {
      throw new Error("Document type, number, and name are required");
    }
    // Otras validaciones de negocio
  }
}

export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PROSPECT = "PROSPECT",
}
