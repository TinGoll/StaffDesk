import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SectorRepository } from './sector.repository';
import { Sector } from '../entities/sector.entity';
import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { FirebirdService } from 'src/modules/firebird/firebird.service';
import { SectorDB } from './sector.types';
import { buildInsertQuery, buildUpdateQuery } from 'src/common/helpers';

const sectorFieldMap: Record<keyof Sector, string> = {
  id: 'ID',
  name: 'NAME',
  orderBy: 'ORDER_BY',
};

@Injectable()
export class DatabaseSectorRepository implements SectorRepository {
  constructor(private readonly firebird: FirebirdService) {}

  async findAll(): Promise<Sector[]> {
    const query = `SELECT * FROM SECTORS`;
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<SectorDB[]>(query);
      return result.map(this.mapRowToSectors);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Unexpected database error');
    }
  }

  async findById(id: number): Promise<Sector | undefined> {
    const query = `SELECT * FROM SECTORS s WHERE s.ID = ?`;
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<SectorDB[]>(query, [id]);
      return result.length ? this.mapRowToSectors(result[0]) : undefined;
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(sector: CreateSectorDto): Promise<Sector> {
    const { query, values } = buildInsertQuery<Sector>(
      'SECTORS',
      sector,
      sectorFieldMap,
    );

    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<SectorDB[]>(query, values);
      return this.mapRowToSectors(result[0]);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, sector: UpdateSectorDto): Promise<Sector> {
    const { query, values } = buildUpdateQuery<Sector>(
      'SECTORS',
      id,
      sector,
      sectorFieldMap,
    );
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<SectorDB[]>(query, values);
      if (!result.length) {
        throw new NotFoundException(`Sector with id ${id} not found`);
      }
      return this.mapRowToSectors(result[0]);
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: number): Promise<void> {
    const query = `
      DELETE FROM SECTORS
      WHERE ID = ?
      RETURNING ID;
    `;
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<{ ID: number }[]>(query, [
        id,
      ]);
      if (!result.length) {
        throw new NotFoundException(`Sector with id ${id} not found`);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private mapRowToSectors(this: void, row: SectorDB): Sector {
    return {
      id: row.ID,
      name: row.NAME,
      orderBy: row.ORDER_BY,
    };
  }

  private handleError(error: unknown): never {
    if (error instanceof Error) {
      throw new BadRequestException(error.message);
    }
    throw new InternalServerErrorException('Unexpected database error');
  }
}
