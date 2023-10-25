import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { InvoiceModel } from './entities/invoice.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';

@Resolver(() => InvoiceModel)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) { }

  // @Mutation(() => InvoiceModel)
  // createInvoice(@Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput) {
  //   return this.invoiceService.create(createInvoiceInput);
  // }

  @Mutation(returns => InvoiceModel)
  async createInvoice(
    @Args('createInvoiceInput') invoice: CreateInvoiceInput,
  ): Promise<InvoiceModel> {
    return await this.invoiceService.create(invoice);
  }

  @Query(() => [InvoiceModel], { name: 'InvoiceModel' })
  findAll() {
    return this.invoiceService.findAll();
  }

  @Query(() => InvoiceModel, { name: 'InvoiceModel' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.invoiceService.findOne(id);
  }

  @Mutation(() => InvoiceModel)
  updateInvoice(@Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput) {
    return this.invoiceService.update(updateInvoiceInput.id, updateInvoiceInput);
  }

  @Mutation(() => InvoiceModel)
  removeInvoice(@Args('id', { type: () => String }) id: string) {
    return this.invoiceService.remove(id);
  }
}
