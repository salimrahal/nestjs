import { Module, forwardRef } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { InvoiceModule } from '../invoice/invoice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from './entities/customer.entity';

@Module({
  providers: [CustomerResolver, CustomerService],
  imports:[forwardRef(() => InvoiceModule), TypeOrmModule.forFeature([CustomerModel])],
  exports:[CustomerService]
})
export class CustomerModule {}
