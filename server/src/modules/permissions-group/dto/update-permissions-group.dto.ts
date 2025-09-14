import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionsGroupDto } from './create-permissions-group.dto';

export class UpdatePermissionsGroupDto extends PartialType(
  CreatePermissionsGroupDto,
) {}
