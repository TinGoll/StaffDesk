import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AssemblyWorksRepository } from './assembly-work.repository';
import { CreateAssemblyWorkDto } from '../dto/create-assembly-work.dto';
import { UpdateAssemblyWorkDto } from '../dto/update-assembly-work.dto';
import { AssemblyWork } from '../entities/assembly-work.entity';
import { AssemblyWorkDB } from './assembly-work.types';
import { FirebirdService } from 'src/modules/firebird/firebird.service';
import { buildInsertQuery, buildUpdateQuery } from 'src/common/helpers';

const workFieldMap: Record<keyof AssemblyWork, keyof AssemblyWorkDB> = {
  id: 'ID',
  sectorID: 'ID_SECTOR',
  name: 'NAME',
  price: 'PRICE',
  actively: 'ACTIVELY',
  sort: 'NUM_SORT',
  optional: 'OPTIONAL',
};

const TABLE_NAME = 'WORK_PRICES';

@Injectable()
export class DatabaseAssemblyWorkRepository implements AssemblyWorksRepository {
  constructor(private readonly firebird: FirebirdService) {}

  async findAll(): Promise<AssemblyWork[]> {
    const query = `SELECT * FROM ${TABLE_NAME}`;
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<AssemblyWorkDB[]>(query);
      return result.map(this.mapRowToWorks);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Unexpected database error');
    }
  }
  async findById(id: number): Promise<AssemblyWork | undefined> {
    const query = `SELECT * FROM ${TABLE_NAME} s WHERE s.ID = ?`;
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<AssemblyWorkDB[]>(query, [
        id,
      ]);

      return result.length ? this.mapRowToWorks(result[0]) : undefined;
    } catch (error) {
      this.handleError(error);
    }
  }
  async create(dto: CreateAssemblyWorkDto): Promise<AssemblyWork> {
    const { query, values } = buildInsertQuery<AssemblyWork>(
      TABLE_NAME,
      dto,
      workFieldMap,
    );
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<AssemblyWorkDB>(
        query,
        values,
      );
      return this.mapRowToWorks(result);
    } catch (error) {
      this.handleError(error);
    }
  }
  async update(id: number, dto: UpdateAssemblyWorkDto): Promise<AssemblyWork> {
    const { query, values } = buildUpdateQuery<AssemblyWork>(
      TABLE_NAME,
      id,
      dto,
      workFieldMap,
    );

    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<AssemblyWorkDB>(
        query,
        values,
      );

      if (!result) {
        throw new NotFoundException(`Work with id ${id} not found`);
      }
      return this.mapRowToWorks(result);
    } catch (error) {
      this.handleError(error);
    }
  }
  async remove(id: number): Promise<void> {
    const query = `
          DELETE FROM ${TABLE_NAME}
          WHERE ID = ?
          RETURNING ID;
        `;
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<{ ID: number }[]>(query, [
        id,
      ]);
      if (!result.length) {
        throw new NotFoundException(`Work with id ${id} not found`);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private mapRowToWorks(this: void, row: AssemblyWorkDB): AssemblyWork {
    return {
      id: row.ID,
      sectorID: row.ID_SECTOR,
      name: row.NAME,
      price: row.PRICE,
      actively: row.ACTIVELY,
      sort: row.NUM_SORT,
      optional: row.OPTIONAL,
    };
  }

  private handleError(error: unknown): never {
    if (error instanceof Error) {
      throw new BadRequestException(error.message);
    }
    throw new InternalServerErrorException('Unexpected database error');
  }
}
