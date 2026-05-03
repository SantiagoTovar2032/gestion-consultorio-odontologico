import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTratamientoDto } from '../dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from '../dto/update-tratamiento.dto';

@Injectable()
export class TratamientoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateTratamientoDto) {
    const prisma = this.prismaService as any;
    return prisma.tratamiento.create({
      data: {
        pacienteId: data.pacienteId,
        odontologoId: data.odontologoId,
        piezaDentalId: data.piezaDentalId,
        fecha: data.fecha ? new Date(data.fecha) : undefined, // si no viene, Prisma usa default(now())
        diagnostico: data.diagnostico,
        procedimiento: data.procedimiento,
        costo: parseFloat(data.costo), // Decimal en Prisma
        observaciones: data.observaciones,
      },
      include: {
        paciente: true,
        odontologo: true,
        piezaDental: true,
      },
    });
  }

  async findAll() {
    const prisma = this.prismaService as any;
    return prisma.tratamiento.findMany({
      include: {
        paciente: true,
        odontologo: true,
        piezaDental: true,
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async findById(id: number) {
    const prisma = this.prismaService as any;
    return prisma.tratamiento.findUnique({
      where: { id },
      include: {
        paciente: true,
        odontologo: true,
        piezaDental: true,
      },
    });
  }

  // 🔹 Tratamientos por paciente
  async findByPacienteId(pacienteId: number) {
    const prisma = this.prismaService as any;
    return prisma.tratamiento.findMany({
      where: { pacienteId },
      include: {
        odontologo: true,
        piezaDental: true,
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async update(id: number, data: UpdateTratamientoDto) {
    const prisma = this.prismaService as any;
    const dataToUpdate: any = { ...data };

    if (data.fecha) {
      dataToUpdate.fecha = new Date(data.fecha as string);
    }
    if (data.costo) {
      dataToUpdate.costo = parseFloat(data.costo);
    }

    return prisma.tratamiento.update({
      where: { id },
      data: dataToUpdate,
      include: {
        paciente: true,
        odontologo: true,
        piezaDental: true,
      },
    });
  }

  async delete(id: number) {
    const prisma = this.prismaService as any;
    return prisma.tratamiento.delete({
      where: { id },
    });
  }
}
