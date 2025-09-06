import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from './employees.repository';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { mockEmployees } from './employee.mocks';

@Injectable()
export class InMemoryEmployeeRepository implements EmployeeRepository {
  private employees: Employee[] = mockEmployees;

  async findAll(): Promise<Employee[]> {
    return Promise.resolve(this.employees);
  }

  async findById(id: number): Promise<Employee> {
    const employee = this.employees.find((e) => e.id === id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return Promise.resolve(employee);
  }

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const id: number = this.employees.length + 1;
    const employee = {
      id,
      ...dto,
    };
    this.employees.push(employee);
    return Promise.resolve(employee);
  }

  async update(id: number, updateUserDto: UpdateEmployeeDto) {
    const item = await this.findById(id);

    const itemIndex = this.employees.findIndex((u) => u.id === id);

    const updatedUser = { ...item, ...updateUserDto };
    this.employees[itemIndex] = updatedUser;

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const item = await this.findById(id);
    this.employees = this.employees.filter((e) => e.id !== item.id);
  }
}
