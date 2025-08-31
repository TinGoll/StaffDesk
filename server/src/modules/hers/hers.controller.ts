import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HersService } from './hers.service';
import { CreateHerDto } from './dto/create-her.dto';
import { UpdateHerDto } from './dto/update-her.dto';

@Controller('hers')
export class HersController {
  constructor(private readonly hersService: HersService) {}

  @Post()
  create(@Body() createHerDto: CreateHerDto) {
    return this.hersService.create(createHerDto);
  }

  @Get()
  findAll() {
    return this.hersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHerDto: UpdateHerDto) {
    console.log(id);
    console.log(updateHerDto);

    return this.hersService.update(id, updateHerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hersService.remove(id);
  }
}
