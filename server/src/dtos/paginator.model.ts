import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatorInfo {
  @Field()
  page: number;

  @Field()
  size: number;

  @Field()
  total: number;
}
