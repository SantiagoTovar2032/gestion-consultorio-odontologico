import { IsString, IsNotEmpty, IsInt, IsOptional, IsDecimal, Min, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTratamientoDto {
  @IsInt()
  @IsNotEmpty()
  pacienteId: number;

  @IsInt()
  @IsNotEmpty()
  odontologoId: number;

  @IsInt()
  @IsOptional()
  piezaDentalId?: number; // Opcional

  @IsString() // Se enviará como string 'YYYY-MM-DD'
  @IsOptional() // La fecha puede ser default(now()) en la BD
  fecha?: string; 

  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @IsString()
  @IsNotEmpty()
  procedimiento: string;

  @IsString() // Prisma espera Decimal, pero se recibe como string "123.45"
  @IsNotEmpty()
  costo: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
