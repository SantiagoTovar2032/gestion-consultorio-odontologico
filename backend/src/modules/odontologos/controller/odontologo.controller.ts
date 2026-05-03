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
import { OdontologoService } from '../service/odontologo.service';
import { CreateOdontologoDto } from '../dto/create-odontologo.dto';
import { UpdateOdontologoDto } from '../dto/update-odontologo.dto';

@Controller('odontologos')
export class OdontologoController {
  constructor(private readonly service: OdontologoService) {}

  @Post()
  create(@Body() dto: CreateOdontologoDto) {
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
    @Body() dto: UpdateOdontologoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
