import { Inject, Injectable } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import type { SectorRepository } from './repository/sector.repository';
import { SECTOR_REPOSITORY } from './repository/sector.tokens';
import { PaginatedResponse } from 'src/common/types/paginated-response.type';

@Injectable()
export class SectorsService {
  constructor(
    @Inject(SECTOR_REPOSITORY)
    private readonly sectorsRepo: SectorRepository,
  ) {}

  create(createEmployeeDto: CreateSectorDto) {
    return this.sectorsRepo.create(createEmployeeDto);
  }

  async findAll(): Promise<PaginatedResponse<unknown>> {
    const items = await this.sectorsRepo.findAll();
    return {
      items,
      meta: {
        total: items?.length,
      },
    };
  }

  findOne(id: number) {
    return this.sectorsRepo.findById(id);
  }

  update(id: number, updateEmployeeDto: UpdateSectorDto) {
    return this.sectorsRepo.update(id, updateEmployeeDto);
  }

  remove(id: number) {
    return this.sectorsRepo.remove(id);
  }
}
