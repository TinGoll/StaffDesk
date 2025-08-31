import { Test, TestingModule } from '@nestjs/testing';
import { HersController } from './hers.controller';
import { HersService } from './hers.service';

describe('HersController', () => {
  let controller: HersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HersController],
      providers: [HersService],
    }).compile();

    controller = module.get<HersController>(HersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
