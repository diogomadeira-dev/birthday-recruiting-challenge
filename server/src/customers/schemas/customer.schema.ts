import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = Customer & HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop()
  customerId: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

//   @Prop()
//   Country: string;

  @Prop()
  birthday: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
