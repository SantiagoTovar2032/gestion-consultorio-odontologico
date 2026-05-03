import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePacienteDto } from '../dto/create-paciente.dto';
import { UpdatePacienteDto } from '../dto/update-paciente.dto';

@Injectable()
export class PacienteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePacienteDto) {
    const prisma = this.prisma as any;
    return prisma.paciente.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        cedula: data.cedula,
        telefono: data.telefono,
        email: data.email,
        fechaNacimiento: new Date(data.fechaNacimiento), // conversión al crear
        direccion: data.direccion,
        antecedentesMedicos: data.antecedentesMedicos,
        alergias: data.alergias,
      },
    });
  }

  async findAll() {
    const prisma = this.prisma as any;
    return prisma.paciente.findMany();
  }

  async findById(id: number) {
    const prisma = this.prisma as any;
    return prisma.paciente.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdatePacienteDto) {
    const prisma = this.prisma as any;

    const dataToUpdate: any = {
      nombre: data.nombre,
      apellido: data.apellido,
      cedula: data.cedula,
      telefono: data.telefono,
      email: data.email,
      direccion: data.direccion,
      antecedentesMedicos: data.antecedentesMedicos,
      alergias: data.alergias,
    };

    // Si viene fechaNacimiento en el DTO, la convertimos a Date
    if (data.fechaNacimiento) {
      dataToUpdate.fechaNacimiento = new Date(data.fechaNacimiento as string);
    }

    return prisma.paciente.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  // 👉 Contar citas del paciente
  async countCitas(id: number): Promise<number> {
    const prisma = this.prisma as any;
    return prisma.cita.count({
      where: { pacienteId: id },
    });
  }

  // 👉 Contar tratamientos del paciente
  async countTratamientos(id: number): Promise<number> {
    const prisma = this.prisma as any;
    return prisma.tratamiento.count({
      where: { pacienteId: id },
    });
  }

  async delete(id: number) {
    const prisma = this.prisma as any;
    return prisma.paciente.delete({
      where: { id },
    });
  }
}
