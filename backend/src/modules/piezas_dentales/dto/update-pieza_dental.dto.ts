import { PartialType } from '@nestjs/mapped-types';
import { CreatePiezaDentalDto } from './create-pieza_dental.dto';

export class UpdatePiezaDentalDto extends PartialType(CreatePiezaDentalDto) {}
