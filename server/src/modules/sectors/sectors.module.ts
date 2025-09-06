import { Module } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { SECTOR_REPOSITORY } from './repository/sector.tokens';
import { InMemorySectorRepository } from './repository/in-memory-sector.repository';
import { DatabaseSectorRepository } from './repository/database-sector.repository';

const isDev = process.env.NODE_ENV !== 'production';

@Module({
  controllers: [SectorsController],
  providers: [
    SectorsService,
    {
      provide: SECTOR_REPOSITORY,
      useClass: isDev ? InMemorySectorRepository : DatabaseSectorRepository,
    },
  ],
  exports: [SECTOR_REPOSITORY],
})
export class SectorsModule {}
