import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { Sector } from '../entities/sector.entity';

export interface SectorRepository {
  findAll(): Promise<Sector[]>;
  findById(id: number): Promise<Sector | undefined>;
  create(employee: CreateSectorDto): Promise<Sector>;
  update(id: number, employee: UpdateSectorDto): Promise<Sector>;
  remove(id: number): Promise<void>;
}
