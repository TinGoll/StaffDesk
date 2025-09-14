import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeRepository } from './employees.repository';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { FirebirdService } from 'src/modules/firebird/firebird.service';
import { EmployeeDB } from './employee.types';
import { buildInsertQuery, buildUpdateQuery } from 'src/common/helpers';

const employeeFieldMap: Record<keyof Employee, keyof EmployeeDB> = {
  id: 'ID',
  name: 'NAME',
  department: 'DEPARTMENT',
  sectorId: 'ID_SECTOR',
  status: 'STATUS',
  location: 'LOCATION',
  firstName: 'FIRSTNAME',
  lastName: 'LASTNAME',
  middleName: 'MIDDLENAME',
  bankCard: 'BANK_CARD',
  cardHolder: 'CARD_HOLDER',
  phone: 'PHONE',
  permissionGroupId: 'PERMISSION_GROUP_ID',
  mgtPass: 'MGMT_PASS',
};

const TABLE_NAME = 'EMPLOYERS';

@Injectable()
export class DatabaseEmployeeRepository implements EmployeeRepository {
  constructor(private readonly firebird: FirebirdService) {}

  async findAll(): Promise<Employee[]> {
    const query = `SELECT * FROM ${TABLE_NAME}`;
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<EmployeeDB[]>(query);
      return result.map(this.mapRowToSectors);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Unexpected database error');
    }
  }
  async findById(id: number): Promise<Employee | undefined> {
    const query = `SELECT * FROM ${TABLE_NAME} s WHERE s.ID = ?`;
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<EmployeeDB[]>(query, [id]);
      return result.length ? this.mapRowToSectors(result[0]) : undefined;
    } catch (error) {
      this.handleError(error);
    }
  }
  async create(employee: CreateEmployeeDto): Promise<Employee> {
    const { query, values } = buildInsertQuery<Employee>(
      TABLE_NAME,
      employee,
      employeeFieldMap,
    );
    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<EmployeeDB>(query, values);

      return this.mapRowToSectors(result);
    } catch (error) {
      this.handleError(error);
    }
  }
  async update(id: number, employee: UpdateEmployeeDto): Promise<Employee> {
    const { query, values } = buildUpdateQuery<Employee>(
      TABLE_NAME,
      id,
      employee,
      employeeFieldMap,
    );

    try {
      const db = await this.firebird.attach();
      const result = await db.executeAndReturning<EmployeeDB>(query, values);

      if (!result) {
        throw new NotFoundException(`Employe with id ${id} not found`);
      }
      return this.mapRowToSectors(result);
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
        throw new NotFoundException(`Employe with id ${id} not found`);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private mapRowToSectors(this: void, row: EmployeeDB): Employee {
    return {
      id: row.ID,
      name: row.NAME,
      department: row.DEPARTMENT,
      sectorId: row.ID_SECTOR,
      status: row.STATUS,
      location: row.LOCATION,
      firstName: row.FIRSTNAME,
      lastName: row.LASTNAME,
      middleName: row.MIDDLENAME,
      bankCard: row.BANK_CARD,
      cardHolder: row.CARD_HOLDER,
      phone: row.PHONE,
      permissionGroupId: row.PERMISSION_GROUP_ID,
      mgtPass: row.MGMT_PASS,
    };
  }

  private handleError(error: unknown): never {
    if (error instanceof Error) {
      throw new BadRequestException(error.message);
    }
    throw new InternalServerErrorException('Unexpected database error');
  }
}
