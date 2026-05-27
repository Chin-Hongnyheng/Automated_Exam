import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SupplierType {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  phone!: string;
}
