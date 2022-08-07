import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IsAlpha, isEmail, IsEmail } from 'class-validator';
import { AppService } from './app.service';
import { Message } from './common/message';
import { CreateChallengeDto } from './dtos/create-challenge-dto';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateChallengeDto } from './dtos/update-challenge-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Challenge } from './schemas/challenge.schema';
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

  @Query((_) => [Challenge!]!)
  getAllChallenges() {
    return this.appService.getAllChallenges();
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

  @Mutation((_) => Challenge)
  createChallenge(
    @Args('createChallengeDto') createChallengeDto: CreateChallengeDto,
  ) {
    return this.appService.createChallenge(createChallengeDto);
  }

  @Mutation((_) => Challenge)
  updateChallenge(
    @Args('updateChallengeDto') updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.appService.updateChallenge(updateChallengeDto);
  }

  @Mutation((_) => Challenge)
  deleteChallenge(
    @Args('challengeId', { type: () => ID, nullable: false })
    challengeId: string,
  ) {
    return this.appService.deleteChallenge(challengeId);
  }
}
