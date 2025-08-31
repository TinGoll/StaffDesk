import { Module } from '@nestjs/common';
import { AssemblyWorkService } from './assembly-work.service';
import { AssemblyWorkController } from './assembly-work.controller';

@Module({
  controllers: [AssemblyWorkController],
  providers: [AssemblyWorkService],
})
export class AssemblyWorkModule {}
