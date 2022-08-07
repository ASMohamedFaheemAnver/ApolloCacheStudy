import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(createUserDto: CreateUserDto) {
    this.logger.log(this.createUser.name, createUserDto);
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async getAllUsers() {
    this.logger.log(this.getAllUsers.name);
    const users = await this.userModel.find().exec();
    this.logger.log(this.getAllUsers.name, users);
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
    this.logger.log(this.deleteUser.name, { response });
    // return { message: 'deleted' };
    return response;
  }
}
