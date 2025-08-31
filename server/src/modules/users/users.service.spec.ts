import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', () => {
    const user = service.create({ name: 'John' });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John');
  });

  it('should return all users', () => {
    service.create({ name: 'Jane' });
    const users = service.findAll();
    expect(users.length).toBeGreaterThan(0);
  });
});
