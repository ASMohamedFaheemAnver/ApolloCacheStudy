import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  name: string;

  @IsNumber()
  @Field()
  age: number;
}
