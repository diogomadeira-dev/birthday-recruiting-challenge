import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomersService } from './customers.service';
import { Customer } from './schemas/customer.schema';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':customerId')
  async getCustomer(@Param('customerId') customerId: string): Promise<Customer> {
    return this.customersService.getCustomerById(customerId);
  }

  @Get()
  async getCustomers(): Promise<Customer[]> {
      return this.customersService.getCustomers();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
      return this.customersService.createCustomer(createCustomerDto.name, createCustomerDto.surname, createCustomerDto.country, createCustomerDto.birthday)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':customerId')
  async updateCustomer(@Param('customerId') customerId: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
      return this.customersService.updateCustomer(customerId, updateCustomerDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':customerId')
  async deleteCustomer(@Param('customerId') customerId: string): Promise<Customer> {
      return this.customersService.deleteCustomer(customerId);
  }
}