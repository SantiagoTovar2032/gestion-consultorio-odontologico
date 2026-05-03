import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { OdontologoController } from './controller/odontologo.controller';
import { OdontologoService } from './service/odontologo.service';
import { OdontologoRepository } from './repository/odontologo.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OdontologoController],
  providers: [OdontologoService, OdontologoRepository],
  exports: [OdontologoService],
})
export class OdontologoModule {}
