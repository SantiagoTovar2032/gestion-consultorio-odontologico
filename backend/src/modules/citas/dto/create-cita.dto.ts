import { IsString, IsNotEmpty, IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreateCitaDto {
  @IsInt()
  @IsNotEmpty()
  pacienteId: number;

  @IsInt()
  @IsNotEmpty()
  odontologoId: number;

  @IsDateString() // <-- Aquí es donde espera un formato de fecha válido
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  hora: string; // Ej: "10:30"

  @IsString()
  @IsNotEmpty()
  motivoConsulta: string;

  @IsString()
  @IsOptional()
  estado?: string; // "Programada", "Realizada", "Cancelada"
}
