import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSupplierInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  phone!: string;
}
