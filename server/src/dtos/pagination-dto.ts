import { Field, InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';

@InputType()
export class PaginationDto {
  @Allow()
  @Field({ nullable: true })
  page: number;

  @Allow()
  @Field({ nullable: true })
  size: number;
}
