import { EmployeeStatus } from '../entities/employee.entity';

export class CreateEmployeeDto {
  name: string;
  sectorId?: number;
  department?: string;
  status: EmployeeStatus;
  location?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  bankCard?: string;
  cardHolder?: string;
  phone?: string;
  permissionGroupId?: number;
  mgmtPass?: string;
}
