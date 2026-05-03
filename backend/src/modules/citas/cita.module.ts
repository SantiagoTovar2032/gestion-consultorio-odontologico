import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CitaController } from './controller/cita.controller';
import { CitaService } from './service/cita.service';
import { CitaRepository } from './repository/cita.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CitaController],
  providers: [CitaService, CitaRepository],
  exports: [CitaService],
})
export class CitaModule {}
