import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CUSTOMER_SEED } from './constant/seed-customer';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {
        this.seedCustomer();
    }

    async seedCustomer() {
        const count = await this.customerRepository.count();
        if (!count) {
            const newRole = await this.customerRepository.create(CUSTOMER_SEED);
            await this.customerRepository.save(newRole);
        }
    }
}
