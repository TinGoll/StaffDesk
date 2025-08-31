import { Test, TestingModule } from '@nestjs/testing';
import { AssemblyWorkController } from './assembly-work.controller';
import { AssemblyWorkService } from './assembly-work.service';

describe('AssemblyWorkController', () => {
  let controller: AssemblyWorkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssemblyWorkController],
      providers: [AssemblyWorkService],
    }).compile();

    controller = module.get<AssemblyWorkController>(AssemblyWorkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
