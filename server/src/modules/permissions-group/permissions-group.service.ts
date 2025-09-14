import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionsGroupDto } from './dto/create-permissions-group.dto';
import { UpdatePermissionsGroupDto } from './dto/update-permissions-group.dto';
import { PERMISSION_GROUP_REPOSITORY } from './repository/permissions-group.tokens';
import type { PermissionsGroupRepository } from './repository/permissions-group.repository';
import { PermissionsGroup } from './entities/permissions-group.entity';
import { PaginatedResponse } from 'src/common/types/paginated-response.type';

@Injectable()
export class PermissionsGroupService {
  constructor(
    @Inject(PERMISSION_GROUP_REPOSITORY)
    private readonly repo: PermissionsGroupRepository,
  ) {}

  async create(dto: CreatePermissionsGroupDto) {
    return this.repo.create(dto);
  }

  async findAll(): Promise<PaginatedResponse<PermissionsGroup>> {
    const items = await this.repo.findAll();
    return {
      items,
      meta: {
        total: items?.length,
      },
    };
  }

  async findOne(id: number) {
    return this.repo.findById(id);
  }

  async update(id: number, dto: UpdatePermissionsGroupDto) {
    return this.repo.update(id, dto);
  }

  async remove(id: number) {
    return this.repo.remove(id);
  }
}
