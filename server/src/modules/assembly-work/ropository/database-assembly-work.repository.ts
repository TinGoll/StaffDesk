import { Injectable, NotFoundException } from '@nestjs/common';
import { AssemblyWork } from '../entities/assembly-work.entity';
import { AssemblyWorksRepository } from './assembly-work.repository';
import { CreateAssemblyWorkDto } from '../dto/create-assembly-work.dto';
import { UpdateAssemblyWorkDto } from '../dto/update-assembly-work.dto';

@Injectable()
export class DatabaseAssemblyWorkRepository implements AssemblyWorksRepository {
  private works: AssemblyWork[] = [
    {
      id: 1,
      sectorID: 2,
      name: 'Подбор',
      price: 65,
      actively: true,
      sort: 1,
      optional: false,
    },
    {
      id: 2,
      sectorID: 2,
      name: 'Запил',
      price: 70,
      actively: true,
      sort: 1,
      optional: false,
    },
    {
      id: 3,
      sectorID: 2,
      name: 'Мастер Джон',
      price: 75,
      actively: true,
      sort: 1,
      optional: false,
    },
    {
      id: 4,
      sectorID: 2,
      name: 'Вайма',
      price: 70,
      actively: true,
      sort: 1,
      optional: false,
    },
  ];

  async findAll(): Promise<AssemblyWork[]> {
    return Promise.resolve(this.works);
  }

  async findById(id: number): Promise<AssemblyWork> {
    const item = this.works.find((e) => e.id === id);
    if (!item) {
      throw new NotFoundException(`Work with ID "${id}" not found`);
    }
    return Promise.resolve(item);
  }

  async create(dto: CreateAssemblyWorkDto): Promise<AssemblyWork> {
    const id: number = this.works.length + 1;
    const item = {
      id,
      ...dto,
    };
    this.works.push(item);
    return Promise.resolve(item);
  }

  async update(id: number, updateUserDto: UpdateAssemblyWorkDto) {
    const item = await this.findById(id);

    const itemIndex = this.works.findIndex((u) => u.id === id);

    const updatedUser = { ...item, ...updateUserDto };
    this.works[itemIndex] = updatedUser;

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const item = await this.findById(id);
    this.works = this.works.filter((e) => e.id !== item.id);
  }
}
