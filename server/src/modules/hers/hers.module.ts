import { Module } from '@nestjs/common';
import { HersService } from './hers.service';
import { HersController } from './hers.controller';

@Module({
  controllers: [HersController],
  providers: [HersService],
})
export class HersModule {}
