import { Injectable, NotFoundException } from '@nestjs/common';
import { TratamientoRepository } from '../repository/tratamiento.repository';
import { CreateTratamientoDto } from '../dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from '../dto/update-tratamiento.dto';

@Injectable()
export class TratamientoService {
  constructor(private readonly repo: TratamientoRepository) {}

  create(dto: CreateTratamientoDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findById(id: number) {
    const tratamiento = await this.repo.findById(id);
    if (!tratamiento) {
      throw new NotFoundException(`Tratamiento con ID ${id} no encontrado`);
    }
    return tratamiento;
  }

  // 🔹 Historial de tratamientos por paciente
  findByPaciente(pacienteId: number) {
    return this.repo.findByPacienteId(pacienteId);
  }

  async update(id: number, dto: UpdateTratamientoDto) {
    await this.findById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.repo.delete(id);
  }
}
