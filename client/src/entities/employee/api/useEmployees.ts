import type { Employee } from '@shared/contracts/employees.contract';
import { useEntity } from '@shared/lib/swr';

export const useEmployees = () =>
  useEntity<Employee>({
    endpoint: 'employees',
    transform: (data) => data,
  });
