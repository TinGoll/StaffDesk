import { Module } from '@nestjs/common';
import { AssemblyWorkService } from './assembly-work.service';
import { AssemblyWorkController } from './assembly-work.controller';
import { InMemoryAssemblyWorkRepository } from './ropository/in-memory-assembly-work.repository';
import { DatabaseAssemblyWorkRepository } from './ropository/database-assembly-work.repository';
import { ASSEMBLY_WORKS_REPOSITORY } from './ropository/assembly-work.tokens';

const isDev = process.env.NODE_ENV !== 'production';

@Module({
  controllers: [AssemblyWorkController],
  providers: [
    AssemblyWorkService,
    {
      provide: ASSEMBLY_WORKS_REPOSITORY,
      useClass: isDev
        ? InMemoryAssemblyWorkRepository
        : DatabaseAssemblyWorkRepository,
    },
  ],
})
export class AssemblyWorkModule {}
