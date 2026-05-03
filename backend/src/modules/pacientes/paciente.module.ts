import { Module } from '@nestjs/common';
import { PacienteController } from './controller/paciente.controller';
import { PacienteService } from './service/paciente.service';
import { PacienteRepository } from './repository/paciente.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PacienteController],
  providers: [PacienteService, PacienteRepository],
  exports: [PacienteService],
})
export class PacienteModule {}
