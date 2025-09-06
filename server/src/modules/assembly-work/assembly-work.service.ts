import { Inject, Injectable } from '@nestjs/common';
import { CreateAssemblyWorkDto } from './dto/create-assembly-work.dto';
import { UpdateAssemblyWorkDto } from './dto/update-assembly-work.dto';
import type { AssemblyWorksRepository } from './ropository/assembly-work.repository';
import { ASSEMBLY_WORKS_REPOSITORY } from './ropository/assembly-work.tokens';
import { AssemblyWork } from './entities/assembly-work.entity';
import { PaginatedResponse } from 'src/common/types/paginated-response.type';

@Injectable()
export class AssemblyWorkService {
  constructor(
    @Inject(ASSEMBLY_WORKS_REPOSITORY)
    private readonly assemblyWorkRepo: AssemblyWorksRepository,
  ) {}

  create(createAssemblyWorkDto: CreateAssemblyWorkDto) {
    return this.assemblyWorkRepo.create(createAssemblyWorkDto);
  }

  async findAll(): Promise<PaginatedResponse<AssemblyWork>> {
    const items = await this.assemblyWorkRepo.findAll();
    return {
      items,
      meta: {
        total: items?.length,
      },
    };
  }

  findOne(id: number) {
    return this.assemblyWorkRepo.findById(id);
  }

  update(id: number, updateAssemblyWorkDto: UpdateAssemblyWorkDto) {
    return this.assemblyWorkRepo.update(id, updateAssemblyWorkDto);
  }

  remove(id: number) {
    return this.assemblyWorkRepo.remove(id);
  }
}
