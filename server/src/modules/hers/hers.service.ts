import { Injectable } from '@nestjs/common';
import { CreateHerDto } from './dto/create-her.dto';
import { UpdateHerDto } from './dto/update-her.dto';
import { Her } from './entities/her.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HersService {
  private hers: Her[] = [];

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
    return this.hers;
  }

  findOne(id: string) {
    const findedUser = this.hers.find((user) => user.id === id);
    return findedUser;
  }

  update(id: string, updateUserDto: UpdateHerDto) {
    const index = this.hers.findIndex((her) => her.id === id);
    if (index < 0) {
      return null;
    }
    this.hers[index] = { ...this.hers[index], ...updateUserDto };
    return this.hers[index];
  }

  remove(id: string) {
    this.hers = this.hers.filter((her) => her.id !== id);
  }
}
