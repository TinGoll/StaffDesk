import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return an array of users', () => {
    jest
      .spyOn(service, 'findAll')
      .mockReturnValue([{ id: 'mock-uuid', name: 'John' }]);
    expect(controller.findAll()).toEqual([{ id: 'mock-uuid', name: 'John' }]);
  });
});
