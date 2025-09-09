import { createStore } from 'zustand';

import type { Employee } from '@shared/contracts/employees.contract';

import type { EmployeeStore, NewEmployee } from './types';

export const employeeStore = createStore<EmployeeStore>((set, get) => {
  const validateEmployee = (employee: Employee | NewEmployee | null) => {
    const errors: Record<string, string> = {};

    if (!employee) return { errors, isValid: false };

    if (!employee.name?.trim()) {
      errors.name = 'Имя';
    }
    if (!employee.department?.trim()) {
      errors.department = 'Отдел';
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  const buildFullName = (
    firstName?: string,
    lastName?: string,
    middleName?: string,
  ) => {
    return [lastName, firstName, middleName].filter(Boolean).join(' ').trim();
  };

  return {
    employee: null,
    isEditing: false,
    isCreating: false,
    errors: {},
    isValid: false,

    setEmployee: (employee) => {
      const { errors, isValid } = validateEmployee(employee);
      set({
        employee,
        isEditing: true,
        isCreating: false,
        errors,
        isValid,
      });
    },

    updateEmployee: (keyOrObject, value) => {
      const current = get().employee;
      if (!current) return;

      let updated: Employee | NewEmployee;

      if (typeof keyOrObject === 'string') {
        updated = { ...current, [keyOrObject]: value } as Employee;
      } else {
        updated = { ...current, ...keyOrObject };
      }
      if (
        'firstName' in updated ||
        'lastName' in updated ||
        'middleName' in updated
      ) {
        updated = {
          ...updated,
          name: buildFullName(
            updated.firstName,
            updated.lastName,
            updated.middleName,
          ),
        };
      }

      const { errors, isValid } = validateEmployee(updated);

      set({
        employee: updated,
        errors,
        isValid,
      });
    },

    createNewEmployee: () => {
      const base: NewEmployee = {
        name: '',
        department: '',
        sectorId: 0,
        status: 1,
        //Временно
        permissionGroupId: 2,
      };
      const { errors, isValid } = validateEmployee(base);

      set({
        employee: base,
        isEditing: false,
        isCreating: true,
        errors,
        isValid,
      });
    },

    clearEmployee: () =>
      set({
        employee: null,
        isEditing: false,
        isCreating: false,
        errors: {},
        isValid: false,
      }),
  };
});
