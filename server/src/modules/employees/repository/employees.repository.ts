import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../entities/employee.entity';

export interface EmployeeRepository {
  findAll(): Promise<Employee[]>;
  findById(id: number): Promise<Employee | undefined>;
  create(employee: CreateEmployeeDto): Promise<Employee>;
  update(id: number, employee: UpdateEmployeeDto): Promise<Employee>;
  remove(id: number): Promise<void>;
}
