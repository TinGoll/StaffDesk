import { CreatePermissionsGroupDto } from '../dto/create-permissions-group.dto';
import { UpdatePermissionsGroupDto } from '../dto/update-permissions-group.dto';
import { PermissionsGroup } from '../entities/permissions-group.entity';

export interface PermissionsGroupRepository {
  findAll(): Promise<PermissionsGroup[]>;
  findById(id: number): Promise<PermissionsGroup | undefined>;
  create(dto: CreatePermissionsGroupDto): Promise<PermissionsGroup>;
  update(id: number, dto: UpdatePermissionsGroupDto): Promise<PermissionsGroup>;
  remove(id: number): Promise<void>;
}
