import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CustomerModel } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { InvoiceService } from '../invoice/invoice.service';
import { InvoiceModel } from '../invoice/entities/invoice.entity';

@Resolver(() => CustomerModel)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService,
    private readonly invoiceService: InvoiceService) { }

  @Query(() => [CustomerModel], { name: 'CustomerModel' })
  findAll() {
    return this.customerService.findAll();
  }

  @Query(() => CustomerModel, { name: 'CustomerModel' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.customerService.findOne(id);
  }

  @ResolveField(returns => [InvoiceModel])
  async invoices(@Parent() customer): Promise<InvoiceModel[]> {
    const { id } = customer;
    return this.invoiceService.findByCustomer(id);
  }

  // @Mutation(() => CustomerModel)
  // createCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput) {
  //   return this.customerService.create(createCustomerInput);
  // }

  @Mutation(returns => CustomerModel)
  async createCustomer(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('phone', { nullable: true }) phone: string,
    @Args('address', { nullable: true }) address: string,
  ): Promise<CustomerModel> {
    return await this.customerService.create({ name, email, phone, address })
  }

  @Mutation(() => CustomerModel)
  updateCustomer(@Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
    return this.customerService.update(updateCustomerInput.id, updateCustomerInput);
  }

  @Mutation(() => CustomerModel)
  removeCustomer(@Args('id', { type: () => String }) id: string) {
    return this.customerService.remove(id);
  }
}