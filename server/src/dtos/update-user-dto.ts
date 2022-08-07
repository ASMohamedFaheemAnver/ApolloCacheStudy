import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

@InputType()
export class UpdateUserDto {
  @IsString()
  @Field(() => ID)
  id: string;

  // @ValidateIf((object, value) => {
  //   return !object?.age || object?.name;
  // })
  // @IsString()
  // @Field()
  // name: string;

  // @ValidateIf((object, value) => {
  //   return !object?.name || object?.age;
  // })
  @IsNumber()
  @Field()
  age: number;
}
