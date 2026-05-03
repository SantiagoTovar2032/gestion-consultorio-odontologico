import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePiezaDentalDto } from '../dto/create-pieza_dental.dto';
import { UpdatePiezaDentalDto } from '../dto/update-pieza_dental.dto';

@Injectable()
export class PiezaDentalRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreatePiezaDentalDto) {
    const prisma = this.prismaService as any;
    return prisma.piezaDental.create({ data });
  }

  async findAll() {
    const prisma = this.prismaService as any;
    return prisma.piezaDental.findMany();
  }

  async findById(id: number) {
    const prisma = this.prismaService as any;
    return prisma.piezaDental.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdatePiezaDentalDto) {
    const prisma = this.prismaService as any;
    return prisma.piezaDental.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    const prisma = this.prismaService as any;
    return prisma.piezaDental.delete({
      where: { id },
    });
  }
}
