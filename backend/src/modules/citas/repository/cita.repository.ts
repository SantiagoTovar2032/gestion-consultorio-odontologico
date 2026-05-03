import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCitaDto } from '../dto/create-cita.dto';
import { UpdateCitaDto } from '../dto/update-cita.dto';

@Injectable()
export class CitaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateCitaDto) {
    const prisma = this.prismaService as any;
    return prisma.cita.create({
      data: {
        pacienteId: data.pacienteId,
        odontologoId: data.odontologoId,
        fecha: new Date(data.fecha), // <--- Conversión de string a Date
        hora: data.hora,
        motivoConsulta: data.motivoConsulta,
        estado: data.estado || "Programada"
      }
    });
  }

  async findAll() {
    const prisma = this.prismaService as any;
    // Traemos la cita junto con los datos del paciente y odontólogo
    return prisma.cita.findMany({
      include: {
        paciente: true,
        odontologo: true
      }
    });
  }

  async findById(id: number) {
    const prisma = this.prismaService as any;
    return prisma.cita.findUnique({
      where: { id },
      include: {
        paciente: true,
        odontologo: true
      }
    });
  }

  async update(id: number, data: UpdateCitaDto) {
    const prisma = this.prismaService as any;
    // Creamos un objeto para los datos que realmente se van a actualizar
    const dataToUpdate: any = { ...data };
    
    // Si la fecha viene en los datos de actualización, la convertimos a Date
    if (data.fecha) {
      dataToUpdate.fecha = new Date(data.fecha as string);
    }

    return prisma.cita.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async delete(id: number) {
    const prisma = this.prismaService as any;
    return prisma.cita.delete({
      where: { id },
    });
  }
}
