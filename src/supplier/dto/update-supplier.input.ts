import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateSupplierInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;
}
