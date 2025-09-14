import type { Employee } from '@shared/contracts/employees.contract';
import { buildFullName } from '@shared/utils/buildFullName';

export const computeFullName = (e: Partial<Employee>): string => {
  return buildFullName({
    firstName: e.firstName,
    lastName: e.lastName,
    middleName: e.middleName,
  });
};
