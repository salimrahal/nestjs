import { InputType, Int, Field, Mutation } from '@nestjs/graphql';
import { Currency, PaymentStatus } from '../entities/invoice.entity';

@InputType()
export class CreateInvoiceInput {
  @Field()
  customer: string;
  @Field()
  invoiceNo: string;
  @Field()
  paymentStatus: PaymentStatus;
  @Field()
  description: string;
  @Field()
  currency: Currency;
  @Field()
  taxRate: number;
  @Field()
  issueDate: Date;
  @Field()
  dueDate: Date;
  @Field()
  note: string;
  @Field(type => [ItemDTO])
  items: Array<{ description: string; rate: number; quantity: number }>;
}
@InputType()
class ItemDTO {
  @Field()
  description: string;
  @Field()
  rate: number;
  @Field()
  quantity: number
}

