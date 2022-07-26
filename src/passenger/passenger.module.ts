import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PASSENGER } from '../common/models/models';
import { PassengerScheme } from './schema/passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: PASSENGER.name, useFactory: () => PassengerScheme },
    ]),
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
  exports: [PassengerService],
})
export class PassengerModule {}
