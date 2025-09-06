import { Injectable, NotFoundException } from '@nestjs/common';
import { SectorRepository } from './sector.repository';
import { Sector } from '../entities/sector.entity';
import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';

@Injectable()
export class InMemorySectorRepository implements SectorRepository {
  private items: Sector[] = [
    { id: 1, name: 'Менеджеры', orderBy: 1 },
    { id: 2, name: 'Сборка', orderBy: 2 },
    { id: 3, name: 'Шлифовка', orderBy: 3 },
    { id: 4, name: 'Лакировка', orderBy: 4 },
  ];

  async findAll(): Promise<Sector[]> {
    return Promise.resolve(this.items);
  }

  async findById(id: number): Promise<Sector> {
    const item = this.items.find((e) => e.id === id);
    if (!item) {
      throw new NotFoundException(`Sector with ID "${id}" not found`);
    }
    return Promise.resolve(item);
  }

  async create(dto: CreateSectorDto): Promise<Sector> {
    const id: number = this.items.length + 1;
    const item = {
      id,
      ...dto,
    };
    this.items.push(item);
    return Promise.resolve(item);
  }

  async update(id: number, updateUserDto: UpdateSectorDto) {
    const item = await this.findById(id);

    const itemIndex = this.items.findIndex((u) => u.id === id);

    const updatedUser = { ...item, ...updateUserDto };
    this.items[itemIndex] = updatedUser;

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const item = await this.findById(id);
    this.items = this.items.filter((e) => e.id !== item.id);
  }
}
