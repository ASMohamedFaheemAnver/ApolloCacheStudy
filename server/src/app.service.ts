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

  updateUser(updateUserDto: UpdateUserDto) {
    this.logger.log(this.getAllUsers.name, updateUserDto);
    return this.userModel.findOneAndUpdate(
      { id: updateUserDto.id },
      updateUserDto,
    );
  }
}
