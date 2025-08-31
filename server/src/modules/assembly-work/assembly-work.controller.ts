import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssemblyWorkService } from './assembly-work.service';
import { CreateAssemblyWorkDto } from './dto/create-assembly-work.dto';
import { UpdateAssemblyWorkDto } from './dto/update-assembly-work.dto';

@Controller('assembly-work')
export class AssemblyWorkController {
  constructor(private readonly assemblyWorkService: AssemblyWorkService) {}

  @Post()
  create(@Body() createAssemblyWorkDto: CreateAssemblyWorkDto) {
    return this.assemblyWorkService.create(createAssemblyWorkDto);
  }

  @Get()
  findAll() {
    return this.assemblyWorkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assemblyWorkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssemblyWorkDto: UpdateAssemblyWorkDto,
  ) {
    return this.assemblyWorkService.update(+id, updateAssemblyWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assemblyWorkService.remove(+id);
  }
}
