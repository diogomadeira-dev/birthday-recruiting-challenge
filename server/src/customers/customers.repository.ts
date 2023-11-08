import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { Customer, CustomerDocument } from "./schemas/customer.schema";

@Injectable()
export class CustomersRepository {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

    async findOne(customerFilterQuery: FilterQuery<Customer>): Promise<Customer> {
        return this.customerModel.findOne(customerFilterQuery);
    }

    async find(customersFilterQuery: FilterQuery<Customer>): Promise<Customer[]> {
        return this.customerModel.find(customersFilterQuery)
    }

    async create(customer: Customer): Promise<Customer> {
        const newCustomer = new this.customerModel(customer);
        return newCustomer.save()
    }

    async findOneAndUpdate(customerFilterQuery: FilterQuery<Customer>, customer: Partial<Customer>): Promise<Customer> {
        return this.customerModel.findOneAndUpdate(customerFilterQuery, customer, { new: true });
    }

    async delete(customerFilterQuery: FilterQuery<Customer>): Promise<Customer> {
        return this.customerModel.findOneAndDelete(customerFilterQuery);
    }
}