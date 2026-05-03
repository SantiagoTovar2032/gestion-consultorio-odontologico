import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PacienteRepository } from '../repository/paciente.repository';
import { CreatePacienteDto } from '../dto/create-paciente.dto';
import { UpdatePacienteDto } from '../dto/update-paciente.dto';

@Injectable()
export class PacienteService {
  constructor(private readonly repo: PacienteRepository) {}

  create(dto: CreatePacienteDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findById(id: number) {
    const p = await this.repo.findById(id);
    if (!p) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }
    return p;
  }

  async update(id: number, dto: UpdatePacienteDto) {
    await this.findById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: number) {
    // Verificar existencia
    await this.findById(id);

    // Contar relaciones
    const citasCount = await this.repo.countCitas(id);
    const tratamientosCount = await this.repo.countTratamientos(id);

    if (citasCount > 0 || tratamientosCount > 0) {
      throw new BadRequestException(
        `No se puede eliminar el paciente porque tiene ${citasCount} cita(s) y ${tratamientosCount} tratamiento(s) asociados.`
      );
    }

    // Si no tiene relaciones, borrar
    return this.repo.delete(id);
  }
}
