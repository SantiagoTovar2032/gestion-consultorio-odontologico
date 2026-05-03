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
import { TratamientoService } from '../service/tratamiento.service';
import { CreateTratamientoDto } from '../dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from '../dto/update-tratamiento.dto';

@Controller('tratamientos')
export class TratamientoController {
  constructor(private readonly service: TratamientoService) {}

  @Post()
  create(@Body() dto: CreateTratamientoDto) {
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

  // 🔹 Endpoint para historial de un paciente
  @Get('paciente/:pacienteId')
  findByPaciente(@Param('pacienteId', ParseIntPipe) pacienteId: number) {
    return this.service.findByPaciente(pacienteId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTratamientoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
