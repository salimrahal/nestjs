import { Injectable } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { CustomerModel } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDTO } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerModel) private customerRepository: Repository<CustomerModel>
  ) { };

  create(customerDTO: CustomerDTO): Promise<CustomerModel> {
    let cust: CustomerModel = new CustomerModel();
    cust.name = customerDTO.name;
    cust.email = customerDTO.email;
    cust.phone = customerDTO.phone;
    cust.address = customerDTO.address;
    console.log('bfr save')
    return this.customerRepository.save(cust);
  }

  findAll(): Promise<CustomerModel[]> {
    return this.customerRepository.find();
  }

  findOne(id: string): Promise<CustomerModel> {
    return this.customerRepository.findOneBy({ id });
  }

  update(id: number, updateCustomerInput: UpdateCustomerInput) {
    return `This action updates a #${id} customer`;
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}
