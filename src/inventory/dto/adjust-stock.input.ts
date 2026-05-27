import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class AdjustStockInput {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  amount!: number;
}
