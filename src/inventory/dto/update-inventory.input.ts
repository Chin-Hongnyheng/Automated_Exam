import { InputType, Field, Float, Int, ID } from '@nestjs/graphql';

@InputType()
export class UpdateInventoryInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  supplierId?: string;

  @Field(() => Int, { nullable: true })
  stockLevel?: number;

  @Field(() => Int, { nullable: true })
  minStockLevel?: number;
}
