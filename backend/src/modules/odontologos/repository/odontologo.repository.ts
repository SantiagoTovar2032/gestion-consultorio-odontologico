import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateOdontologoDto } from '../dto/create-odontologo.dto';
import { UpdateOdontologoDto } from '../dto/update-odontologo.dto';

@Injectable()
export class OdontologoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateOdontologoDto) {
    const prisma = this.prismaService as any;
    return prisma.odontologo.create({ data });
  }

  async findAll() {
    const prisma = this.prismaService as any;
    return prisma.odontologo.findMany({
      include: { especialidad: true },
    });
  }

  async findById(id: number) {
    const prisma = this.prismaService as any;
    return prisma.odontologo.findUnique({
      where: { id },
      include: { especialidad: true },
    });
  }

  async update(id: number, data: UpdateOdontologoDto) {
    const prisma = this.prismaService as any;
    return prisma.odontologo.update({
      where: { id },
      data,
    });
  }

  // 👉 Contar citas del odontólogo
  async countCitas(id: number): Promise<number> {
    const prisma = this.prismaService as any;
    return prisma.cita.count({
      where: { odontologoId: id },
    });
  }

  // 👉 Contar tratamientos del odontólogo
  async countTratamientos(id: number): Promise<number> {
    const prisma = this.prismaService as any;
    return prisma.tratamiento.count({
      where: { odontologoId: id },
    });
  }

  // 👉 Borrado final (solo se llama si ya sabemos que no tiene relaciones)
  async delete(id: number) {
    const prisma = this.prismaService as any;
    return prisma.odontologo.delete({
      where: { id },
    });
  }
}
