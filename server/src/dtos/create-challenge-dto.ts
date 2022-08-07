import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateChallengeDto {
  @MinLength(3)
  @IsString()
  @Field()
  name: string;

  @Field((_) => [ID!]!)
  participants: string[];
}
