import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsGroupController } from './permissions-group.controller';
import { PermissionsGroupService } from './permissions-group.service';

describe('PermissionsGroupController', () => {
  let controller: PermissionsGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsGroupController],
      providers: [PermissionsGroupService],
    }).compile();

    controller = module.get<PermissionsGroupController>(
      PermissionsGroupController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
