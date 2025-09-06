import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { InMemoryEmployeeRepository } from './repository/in-memory-employees.repository';
import { DatabaseEmployeeRepository } from './repository/database-employees.repository';
import { EMPLOYEE_REPOSITORY } from './repository/employee.tokens';

const isDev = process.env.NODE_ENV !== 'production';

@Module({
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    {
      provide: EMPLOYEE_REPOSITORY,
      useClass: isDev ? InMemoryEmployeeRepository : DatabaseEmployeeRepository,
    },
  ],
})
export class EmployeesModule {}
