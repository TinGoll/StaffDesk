import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export interface PaginatedUsersResponse {
  items: User[];
  meta: {
    total: number;
    count: number;
  };
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: uuidv4(), name: 'John Doe' },
    { id: uuidv4(), name: 'Jane Smith' },
  ];

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      name: createUserDto.name,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return {
      items: this.users,
      meta: {
        total: this.users.length,
        count: this.users.length,
      },
    };
  }

  findOne(id: string) {
    const findedUser = this.users.find((user) => user.id === id);
    if (!findedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return findedUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const userIndex = this.users.findIndex((u) => u.id === id);

    const updatedUser = { ...user, ...updateUserDto };
    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  remove(id: string) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u.id !== user.id);
  }
}
