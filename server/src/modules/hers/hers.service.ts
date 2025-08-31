import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHerDto } from './dto/create-her.dto';
import { UpdateHerDto } from './dto/update-her.dto';
import { Her } from './entities/her.entity';
import { v4 as uuidv4 } from 'uuid';

export interface PaginatedUsersResponse {
  items: Her[];
  meta: {
    total: number;
    count: number;
  };
}

@Injectable()
export class HersService {
  private hers: Her[] = [{ id: 'test-id', name: 'test-name' }];

  create(createUserDto: CreateHerDto) {
    const newUser: Her = {
      id: uuidv4(),
      name: createUserDto.name,
      diameter: createUserDto.diameter,
    };
    this.hers.push(newUser);
    return newUser;
  }

  findAll() {
    return {
      items: this.hers,
      meta: {
        total: this.hers.length,
        count: this.hers.length,
      },
    };
  }

  findOne(id: string) {
    const findedUser = this.hers.find((user) => user.id === id);
    console.log('findedUser', findedUser);
    if (!findedUser) {
      throw new NotFoundException(`Her with ID "${id}" not found`);
    }
    return findedUser;
  }

  update(id: string, updateUserDto: UpdateHerDto) {
    const item = this.findOne(id);
    const itemIndex = this.hers.findIndex((u) => u.id === id);

    const updatedUser = { ...item, ...updateUserDto };
    this.hers[itemIndex] = updatedUser;

    return updatedUser;
  }

  remove(id: string) {
    const item = this.findOne(id);
    this.hers = this.hers.filter((u) => u.id !== item.id);
  }
}
