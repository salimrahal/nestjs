import { Injectable } from '@nestjs/common';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { InvoiceModel } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class InvoiceService {

  constructor(
    @InjectRepository(InvoiceModel)
    private invoiceRepository: Repository<InvoiceModel>,
    private customerService: CustomerService
  ) { };

  findByCustomer(id: string): Promise<InvoiceModel[]>{
    return this.invoiceRepository.createQueryBuilder("invoice")
    .where("invoice.customer = :id", { id })
    .getMany();
  }
  
  // create(createInvoiceInput: CreateInvoiceInput) {
  //   return 'This action adds a new invoice';
  // }
  
  async create(invoice: CreateInvoiceInput): Promise<InvoiceModel> {
    const customer = await this.customerService.findOne(invoice.customer);
    const subTotal = invoice.items.reduce((acc, curr) => {
      return acc + Number((curr.rate * curr.quantity).toFixed(2))
    }, 0)

    const taxAmount = subTotal * Number((invoice.taxRate / 100).toFixed(2));
    const total = subTotal + taxAmount;
    const outstandingBalance = total;
    return this.invoiceRepository.save({
      ...invoice,
      customer,
      subTotal,
      taxAmount,
      total,
      outstandingBalance
    } as any);

  }
  
  findAll(): Promise<InvoiceModel[]> {
    return this.invoiceRepository.find();
  }

  findOne(id: string): Promise<InvoiceModel> {
    return this.invoiceRepository.findOneBy({id});
  }

  update(id: number, updateInvoiceInput: UpdateInvoiceInput) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: string) {
    return `This action removes a #${id} invoice`;
  }
}
