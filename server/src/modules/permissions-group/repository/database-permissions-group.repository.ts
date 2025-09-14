import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PermissionsGroup } from '../entities/permissions-group.entity';
import { PermissionsGroupDB } from './permissions-group.types';
import { PermissionsGroupRepository } from './permissions-group.repository';
import { FirebirdService } from 'src/modules/firebird/firebird.service';
import { CreatePermissionsGroupDto } from '../dto/create-permissions-group.dto';
import { UpdatePermissionsGroupDto } from '../dto/update-permissions-group.dto';
import { buildInsertQuery, buildUpdateQuery } from 'src/common/helpers';

const itemFieldMap: Record<keyof PermissionsGroup, keyof PermissionsGroupDB> = {
  id: 'ID',
  name: 'NAME',
  owner: 'OWNER',
};

const TABLE_NAME = 'PERMISSIONS_GROUP';

@Injectable()
export class DatabasePermissionsGroupRepository
  implements PermissionsGroupRepository
{
  constructor(private readonly firebird: FirebirdService) {}

  async findAll(): Promise<PermissionsGroup[]> {
    const query = `SELECT * FROM ${TABLE_NAME}`;
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<PermissionsGroupDB[]>(query);
      return result.map(this.mapRowToItems);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Unexpected database error');
    }
  }
  async findById(id: number): Promise<PermissionsGroup | undefined> {
    const query = `SELECT * FROM ${TABLE_NAME} s WHERE s.ID = ?`;
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<PermissionsGroupDB[]>(query, [
        id,
      ]);

      return result.length ? this.mapRowToItems(result[0]) : undefined;
    } catch (error) {
      this.handleError(error);
    }
  }
  async create(dto: CreatePermissionsGroupDto): Promise<PermissionsGroup> {
    const { query, values } = buildInsertQuery<PermissionsGroup>(
      TABLE_NAME,
      dto,
      itemFieldMap,
    );
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<PermissionsGroupDB>(
        query,
        values,
      );
      return this.mapRowToItems(result);
    } catch (error) {
      this.handleError(error);
    }
  }
  async update(
    id: number,
    dto: UpdatePermissionsGroupDto,
  ): Promise<PermissionsGroup> {
    const { query, values } = buildUpdateQuery<PermissionsGroup>(
      TABLE_NAME,
      id,
      dto,
      itemFieldMap,
    );

    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<PermissionsGroupDB>(
        query,
        values,
      );

      if (!result) {
        throw new NotFoundException(`PermissionsGroup with id ${id} not found`);
      }
      return this.mapRowToItems(result);
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
        throw new NotFoundException(`PermissionsGroup with id ${id} not found`);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private mapRowToItems(this: void, row: PermissionsGroupDB): PermissionsGroup {
    return {
      id: row.ID,
      name: row.NAME,
      owner: row.OWNER,
    };
  }

  private handleError(error: unknown): never {
    if (error instanceof Error) {
      throw new BadRequestException(error.message);
    }
    throw new InternalServerErrorException('Unexpected database error');
  }
}
