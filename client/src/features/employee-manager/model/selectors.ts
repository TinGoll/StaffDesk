import { useStore } from 'zustand';

import { employeeStore } from './store';

export const useCurrentEmployee = () =>
  useStore(employeeStore, (state) => state.employee);
export const useEmployeeErrors = () =>
  useStore(employeeStore, (state) => state.errors);

export const useIsCreatingEmployee = () =>
  useStore(employeeStore, (state) => state.isCreating);
export const useIsEditingEmployee = () =>
  useStore(employeeStore, (state) => state.isEditing);
export const useIsValidEmployee = () =>
  useStore(employeeStore, (state) => state.isValid);

export const { clearEmployee, createNewEmployee, setEmployee, updateEmployee } =
  employeeStore.getState();
