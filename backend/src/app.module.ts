import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PacienteModule } from './modules/pacientes/paciente.module';
import { OdontologoModule } from './modules/odontologos/odontologo.module';
import { CitaModule } from './modules/citas/cita.module';
import { PiezaDentalModule } from './modules/piezas_dentales/pieza_dental.module';
import { TratamientoModule } from './modules/tratamientos/tratamiento.module'; // <-- Importación del módulo de Tratamiento

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    PacienteModule,
    OdontologoModule,
    CitaModule,
    PiezaDentalModule,
    TratamientoModule, // <-- Registro del módulo de Tratamiento
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
