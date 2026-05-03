import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePiezaDentalDto {
  @IsString()
  @IsNotEmpty()
  numero: string; // Ej: "11", "21", "31"

  @IsString()
  @IsNotEmpty()
  nombre: string; // Ej: "Incisivo Central Superior Derecho"

  @IsString()
  @IsNotEmpty()
  tipo: string; // Ej: "Incisivo", "Canino"
}
