import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from '../common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async hasPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async checkPassword(
    TextPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(TextPassword, hashPassword);
  }
  async create(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hasPassword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }

  async findByUserName(username: string): Promise<IUser> {
    return await this.model.findOne({ username });
  }

  async update(id: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hasPassword(userDTO.password);
    const user = { ...userDTO, password: hash };
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteOne(id: string): Promise<IUser> {
    return await this.model.findByIdAndRemove(id);
  }
}
