import { PartialType } from '@nestjs/mapped-types';
import { CreatePacienteDto } from './create-paciente.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {}
