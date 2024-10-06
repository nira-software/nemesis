import { Customer } from "@/nemesis/customers/domain/customer";


export interface ICustomerRepository {
  save( customer: Customer ): Promise<any>;
}
