import { Module } from '@nestjs/common';
import { PermissionsGroupService } from './permissions-group.service';
import { PermissionsGroupController } from './permissions-group.controller';
import { FirebirdModule } from '../firebird/firebird.module';
import { PERMISSION_GROUP_REPOSITORY } from './repository/permissions-group.tokens';
import { InMemoryPermissionsGroupRepository } from './repository/in-memory-permissions-group.repository';
import { DatabasePermissionsGroupRepository } from './repository/database-permissions-group.repository';

const isDev = process.env.NODE_ENV !== 'production';

@Module({
  controllers: [PermissionsGroupController],
  providers: [
    PermissionsGroupService,
    {
      provide: PERMISSION_GROUP_REPOSITORY,
      useClass: isDev
        ? InMemoryPermissionsGroupRepository
        : DatabasePermissionsGroupRepository,
    },
  ],
  imports: [FirebirdModule.forRoot()],
})
export class PermissionsGroupModule {}
