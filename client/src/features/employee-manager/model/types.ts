import type { Employee } from '@shared/contracts/employees.contract';

export type NewEmployee = Omit<Employee, 'id'>;

export interface EmployeeStore {
  employee: Employee | NewEmployee | null;
  setEmployee: (employee: Employee) => void;
  updateEmployee: <K extends keyof Employee>(
    keyOrObject: K | Partial<Employee>,
    value?: Employee[K],
  ) => void;
  createNewEmployee: () => void;
  clearEmployee: () => void;
  isEditing: boolean;
  isCreating: boolean;
  errors: Record<string, string>;
  isValid: boolean;
}
