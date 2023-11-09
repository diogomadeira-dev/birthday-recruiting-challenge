import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CountryDocument = Country & HydratedDocument<Country>;

@Schema()
export class Country {
  @Prop()
  countryId: string;

  @Prop()
  name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
