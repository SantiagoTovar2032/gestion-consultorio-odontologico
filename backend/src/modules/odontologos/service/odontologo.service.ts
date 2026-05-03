import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OdontologoRepository } from '../repository/odontologo.repository';
import { CreateOdontologoDto } from '../dto/create-odontologo.dto';
import { UpdateOdontologoDto } from '../dto/update-odontologo.dto';

@Injectable()
export class OdontologoService {
  constructor(private readonly repo: OdontologoRepository) {}

  create(dto: CreateOdontologoDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findById(id: number) {
    const o = await this.repo.findById(id);
    if (!o) {
      throw new NotFoundException(`Odontólogo con ID ${id} no encontrado`);
    }
    return o;
  }

  async update(id: number, dto: UpdateOdontologoDto) {
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
        `No se puede eliminar el odontólogo porque tiene ${citasCount} cita(s) y ${tratamientosCount} tratamiento(s) asociados.`
      );
    }

    // Si no tiene relaciones, borrar
    return this.repo.delete(id);
  }
}
