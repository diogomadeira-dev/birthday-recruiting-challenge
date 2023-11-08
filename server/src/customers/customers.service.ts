import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateCustomerDto } from "./dto/update-customer.dto";

import { CustomersRepository } from "./customers.repository";
import { Customer } from "./schemas/customer.schema";

@Injectable()
export class CustomersService {
    constructor(private readonly customersRepository: CustomersRepository) {}

    async getCustomerById(customerId: string): Promise<Customer> {
        return this.customersRepository.findOne({ customerId })
    }

    async getCustomers(): Promise<Customer[]> {
        return this.customersRepository.find({});
    }

    async createCustomer(name: string, surname: string, birthday: Date): Promise<Customer> {
        return this.customersRepository.create({
            customerId: uuidv4(),
            name,
            surname,
            birthday,
        })
    }

    async updateCustomer(customerId: string, customerUpdates: UpdateCustomerDto): Promise<Customer> {
        return this.customersRepository.findOneAndUpdate({ customerId }, customerUpdates);
    }

    async deleteCustomer(customerId: string): Promise<Customer> {
        return this.customersRepository.delete({ customerId });
    }
}