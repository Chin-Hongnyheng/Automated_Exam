import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRegisterInput {
  @Field()
  userName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  confirmPassword!: string;
}
