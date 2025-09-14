import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionsGroupService } from './permissions-group.service';
import { CreatePermissionsGroupDto } from './dto/create-permissions-group.dto';
import { UpdatePermissionsGroupDto } from './dto/update-permissions-group.dto';

@Controller('permissions-group')
export class PermissionsGroupController {
  constructor(
    private readonly permissionsGroupService: PermissionsGroupService,
  ) {}

  @Post()
  create(@Body() createPermissionsGroupDto: CreatePermissionsGroupDto) {
    return this.permissionsGroupService.create(createPermissionsGroupDto);
  }

  @Get()
  findAll() {
    return this.permissionsGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsGroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionsGroupDto: UpdatePermissionsGroupDto,
  ) {
    return this.permissionsGroupService.update(+id, updatePermissionsGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsGroupService.remove(+id);
  }
}
