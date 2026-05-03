import { Injectable, NotFoundException } from '@nestjs/common';
import { PiezaDentalRepository } from '../repository/pieza_dental.repository';
import { CreatePiezaDentalDto } from '../dto/create-pieza_dental.dto';
import { UpdatePiezaDentalDto } from '../dto/update-pieza_dental.dto';

@Injectable()
export class PiezaDentalService {
  constructor(private readonly repo: PiezaDentalRepository) {}

  create(dto: CreatePiezaDentalDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findById(id: number) {
    const piezaDental = await this.repo.findById(id);
    if (!piezaDental) {
      throw new NotFoundException(`Pieza dental con ID ${id} no encontrada`);
    }
    return piezaDental;
  }

  async update(id: number, dto: UpdatePiezaDentalDto) {
    await this.findById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.repo.delete(id);
  }
}
