import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/schemas/user.schema';
import { PaginatorInfo } from './paginator.model';

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  users: User[];
  @Field()
  info: PaginatorInfo;
}
