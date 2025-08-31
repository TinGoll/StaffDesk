import { Test, TestingModule } from '@nestjs/testing';
import { HersService } from './hers.service';

describe('HersService', () => {
  let service: HersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HersService],
    }).compile();

    service = module.get<HersService>(HersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
