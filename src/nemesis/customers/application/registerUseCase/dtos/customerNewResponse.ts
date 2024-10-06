import { CustomerStatus } from "@/nemesis/customers/domain/customer";

export type CustomerNewResponse = {
  documentType: string,
  documentNumber: string,
  name: string,
  phone?: string,
  email?: string,
  activityCode?: string,
  activityDescription?: string,
  registrationDate: Date,
  status: CustomerStatus,
  notes?: string,
}
