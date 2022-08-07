import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IsAlpha, isEmail, IsEmail } from 'class-validator';
import { AppService } from './app.service';
import { Message } from './common/message';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { User } from './schemas/user.schema';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}
  // Queries
  @Query((_) => Message)
  root(): Message {
    return { message: 'server is up and running' };
  }

  @Query((_) => [User!]!)
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  // Mutations
  @Mutation((_) => User)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Mutation((_) => User)
  updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return this.appService.updateUser(updateUserDto);
  }

  @Mutation((_) => User)
  deleteUser(
    @Args('userId', { type: () => ID, nullable: false })
    userId: string,
  ) {
    return this.appService.deleteUser(userId);
  }
}
