import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomersController } from "./customers.controller";
import { CustomersRepository } from "./customers.repository";
import { CustomersService } from "./customers.service";
import { Customer, CustomerSchema } from "./schemas/customer.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
    controllers: [CustomersController],
    providers: [CustomersService, CustomersRepository]
})
export class CustomersModule {}