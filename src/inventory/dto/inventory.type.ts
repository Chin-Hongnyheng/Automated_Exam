import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class InventoryType {
  @Field(() => ID)
  id!: string;

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
