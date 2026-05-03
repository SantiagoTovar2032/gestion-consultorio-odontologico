import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TratamientoController } from './controller/tratamiento.controller';
import { TratamientoService } from './service/tratamiento.service';
import { TratamientoRepository } from './repository/tratamiento.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TratamientoController],
  providers: [TratamientoService, TratamientoRepository],
  exports: [TratamientoService],
})
export class TratamientoModule {}
