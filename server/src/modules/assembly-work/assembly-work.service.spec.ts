import { Test, TestingModule } from '@nestjs/testing';
import { AssemblyWorkService } from './assembly-work.service';

describe('AssemblyWorkService', () => {
  let service: AssemblyWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssemblyWorkService],
    }).compile();

    service = module.get<AssemblyWorkService>(AssemblyWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
