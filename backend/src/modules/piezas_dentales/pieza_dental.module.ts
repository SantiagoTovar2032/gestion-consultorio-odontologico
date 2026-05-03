import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PiezaDentalController } from './controller/pieza_dental.controller';
import { PiezaDentalService } from './service/pieza_dental.service';
import { PiezaDentalRepository } from './repository/pieza_dental.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PiezaDentalController],
  providers: [PiezaDentalService, PiezaDentalRepository],
  exports: [PiezaDentalService],
})
export class PiezaDentalModule {}
