import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }
}
