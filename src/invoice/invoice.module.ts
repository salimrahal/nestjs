import { Module, forwardRef } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { CustomerModule } from '../customer/customer.module';
import { InvoiceModel } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [InvoiceResolver, InvoiceService],
  imports:[forwardRef(()=> CustomerModule),  TypeOrmModule.forFeature([InvoiceModel])],
  exports:[InvoiceService]
})
export class InvoiceModule {}
