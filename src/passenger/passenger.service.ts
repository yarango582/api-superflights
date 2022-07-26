import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PASSENGER } from 'src/common/models/models';
import { PassengerDTO } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}
  async create(passengerDTO: PassengerDTO) {
    const newPassenger = await this.model.create(passengerDTO);
    return newPassenger.save();
  }
  async findOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }
  async findAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }
}
