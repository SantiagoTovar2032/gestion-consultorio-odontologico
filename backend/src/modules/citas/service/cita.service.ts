import { Injectable, NotFoundException } from '@nestjs/common';
import { CitaRepository } from '../repository/cita.repository';
import { CreateCitaDto } from '../dto/create-cita.dto';
import { UpdateCitaDto } from '../dto/update-cita.dto';

@Injectable()
export class CitaService {
  constructor(private readonly repo: CitaRepository) {}

  create(dto: CreateCitaDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findById(id: number) {
    const cita = await this.repo.findById(id);
    if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
    return cita;
  }

  async update(id: number, dto: UpdateCitaDto) {
    await this.findById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.repo.delete(id);
  }
}
