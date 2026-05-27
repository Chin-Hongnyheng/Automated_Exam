import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateInventoryInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => Int)
  quantity!: number;

  @Field(() => Float)
  price!: number;

  @Field()
  supplierId!: string;

  @Field(() => Int)
  stockLevel!: number;

  @Field(() => Int)
  minStockLevel!: number;
}
