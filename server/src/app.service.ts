import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateChallengeDto } from './dtos/create-challenge-dto';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateChallengeDto } from './dtos/update-challenge-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Challenge, ChallengeDocument } from './schemas/challenge.schema';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Challenge.name)
    private challengeModel: Model<ChallengeDocument>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    this.logger.log(this.createUser.name, createUserDto);
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async getAllUsers(ageDivider: number) {
    this.logger.log(this.getAllUsers.name);
    let filter: FilterQuery<User> = {};
    if (ageDivider) {
      filter = { age: { $gt: ageDivider } };
    }
    const users = await this.userModel.find(filter).exec();
    this.logger.log(users);
    return users;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    this.logger.log(this.updateUser.name, updateUserDto);
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: updateUserDto.id },
      { age: updateUserDto.age },
      { new: true },
    );
    this.logger.log(updatedUser);
    return updatedUser;
  }

  async deleteUser(userId: string) {
    this.logger.log(this.deleteUser.name, { userId });
    const response = await this.userModel.findOneAndDelete({ _id: userId });
    this.logger.log({ response });
    // return { message: 'deleted' };
    return response;
  }

  async getAllChallenges() {
    this.logger.log(this.getAllChallenges.name);
    const challenges = await this.challengeModel
      .find()
      .populate('participants')
      .exec();
    this.logger.log({ challenges });
    return challenges;
  }

  async createChallenge(createChallengeDto: CreateChallengeDto) {
    this.logger.log(this.createChallenge.name, { createChallengeDto });
    const newChallenge = new this.challengeModel(createChallengeDto);
    return newChallenge.save();
  }

  async updateChallenge(updateChallengeDto: UpdateChallengeDto) {
    this.logger.log(this.updateChallenge.name, {
      updateChallengeDto,
    });
    const updatedChallenge = await this.challengeModel
      .findOneAndUpdate(
        { _id: updateChallengeDto.id },
        {
          name: updateChallengeDto.name,
          participants: updateChallengeDto.participants,
        },
        { new: true },
      )
      .populate('participants');
    this.logger.log({ updatedChallenge });
    return updatedChallenge;
  }

  async deleteChallenge(challengeId: string) {
    this.logger.log(this.deleteChallenge.name, { challengeId });
    const response = await this.challengeModel.findOneAndDelete({
      _id: challengeId,
    });
    this.logger.log({ response });
    // return { message: 'deleted' };
    return response;
  }
}
