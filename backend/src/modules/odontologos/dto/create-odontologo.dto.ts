import { IsString, IsNotEmpty, IsEmail, IsInt, Min } from 'class-validator';

export class CreateOdontologoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  cedula: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @Min(1)
  especialidadId: number;

  @IsString()
  @IsNotEmpty()
  horarioInicio: string; // "08:00"

  @IsString()
  @IsNotEmpty()
  horarioFin: string; // "17:00"
}
