import { Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import type { EmployeeRepository } from './repository/employees.repository';
import { EMPLOYEE_REPOSITORY } from './repository/employee.tokens';
import { PaginatedResponse } from 'src/common/types/paginated-response.type';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    // eslint-disable-next-line prettier/prettier
    private readonly employeesRepo: EmployeeRepository
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeesRepo.create(createEmployeeDto);
  }

  async findAll(): Promise<PaginatedResponse<Employee>> {
    const items = await this.employeesRepo.findAll();
    return {
      items,
      meta: {
        total: items.length,
      },
    };
  }

  findOne(id: number) {
    return this.employeesRepo.findById(id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesRepo.update(id, updateEmployeeDto);
  }

  remove(id: number) {
    return this.employeesRepo.remove(id);
  }
}
