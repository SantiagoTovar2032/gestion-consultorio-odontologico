import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PiezaDentalService } from '../service/pieza_dental.service';
import { CreatePiezaDentalDto } from '../dto/create-pieza_dental.dto';
import { UpdatePiezaDentalDto } from '../dto/update-pieza_dental.dto';

@Controller('piezas-dentales') // URL para acceder: /piezas-dentales
export class PiezaDentalController {
  constructor(private readonly service: PiezaDentalService) {}

  @Post()
  create(@Body() dto: CreatePiezaDentalDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePiezaDentalDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
