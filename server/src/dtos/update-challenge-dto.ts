import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateChallengeDto {
  @IsString()
  @Field(() => ID)
  id: string;

  @MinLength(3)
  @IsString()
  @Field()
  name: string;

  @Field((_) => [ID!]!)
  participants: string[];
}
