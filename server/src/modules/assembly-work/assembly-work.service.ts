import { Injectable } from '@nestjs/common';
import { CreateAssemblyWorkDto } from './dto/create-assembly-work.dto';
import { UpdateAssemblyWorkDto } from './dto/update-assembly-work.dto';

@Injectable()
export class AssemblyWorkService {
  create(createAssemblyWorkDto: CreateAssemblyWorkDto) {
    return 'This action adds a new assemblyWork';
  }

  findAll() {
    return `This action returns all assemblyWork`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assemblyWork`;
  }

  update(id: number, updateAssemblyWorkDto: UpdateAssemblyWorkDto) {
    return `This action updates a #${id} assemblyWork`;
  }

  remove(id: number) {
    return `This action removes a #${id} assemblyWork`;
  }
}
