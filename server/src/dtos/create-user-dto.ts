import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @MinLength(3)
  @IsString()
  @Field()
  name: string;

  @IsNumber()
  @Field()
  age: number;
}
