import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateChallengeDto {
  @IsString()
  @Field(() => ID)
  id: string;

  @MinLength(3)
  @IsString()
  @Field()
  name: string;

  @IsArray()
  @Field((_) => [ID])
  participants: string[];
}
