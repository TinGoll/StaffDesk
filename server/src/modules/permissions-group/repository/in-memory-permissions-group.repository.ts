import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionsGroupRepository } from './permissions-group.repository';
import { PermissionsGroup } from '../entities/permissions-group.entity';
import { CreatePermissionsGroupDto } from '../dto/create-permissions-group.dto';
import { UpdatePermissionsGroupDto } from '../dto/update-permissions-group.dto';

@Injectable()
export class InMemoryPermissionsGroupRepository
  implements PermissionsGroupRepository
{
  private items: PermissionsGroup[] = [
    {
      id: 1,
      name: 'Admin',
      owner: 1,
    },
    { id: 2, name: 'user', owner: 0 },
  ];

  async findAll(): Promise<PermissionsGroup[]> {
    return Promise.resolve(this.items);
  }

  async findById(id: number): Promise<PermissionsGroup> {
    const item = this.items.find((e) => e.id === id);
    if (!item) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return Promise.resolve(item);
  }

  async create(dto: CreatePermissionsGroupDto): Promise<PermissionsGroup> {
    const id: number = this.items.length + 1;
    const item = {
      id,
      ...dto,
    };
    this.items.push(item);
    return Promise.resolve(item);
  }

  async update(id: number, updateUserDto: UpdatePermissionsGroupDto) {
    const item = await this.findById(id);

    const itemIndex = this.items.findIndex((u) => u.id === id);

    const updatedItem = { ...item, ...updateUserDto };
    this.items[itemIndex] = updatedItem;

    return updatedItem;
  }

  async remove(id: number): Promise<void> {
    const item = await this.findById(id);
    this.items = this.items.filter((e) => e.id !== item.id);
  }
}
