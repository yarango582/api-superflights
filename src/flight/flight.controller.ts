import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dot';
import { PassengerService } from '../passenger/passenger.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('flights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}
  @Post()
  create(@Body() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO);
  }
  @Get()
  findAll() {
    return this.flightService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }
  @Post(':flightId/passenger/:passengerId')
  async addPassanger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passanger = await this.passengerService.findOne(passengerId);
    if (!passanger) {
      throw new HttpException('Passenger Not Found', HttpStatus.BAD_REQUEST);
    }
    return this.flightService.addPassenger(flightId, passengerId);
  }
}
