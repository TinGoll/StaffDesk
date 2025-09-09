import { App } from 'antd';

import type { Employee } from '@shared/contracts/employees.contract';

import {
  clearEmployee,
  setEmployee,
  useIsCreatingEmployee,
} from '../model/selectors';

export function useSafeEmployeeActions() {
  const isCreating = useIsCreatingEmployee();
  const { modal } = App.useApp();

  const safeSetEmployee = (employee: Employee) => {
    if (isCreating) {
      modal.confirm({
        title: 'Вы создаёте нового сотрудника',
        content: 'Несохранённые данные будут потеряны. Продолжить?',
        okText: 'Да',
        cancelText: 'Отмена',
        onOk: () => setEmployee(employee),
      });
    } else {
      setEmployee(employee);
    }
  };

  const safeClearEmployee = () => {
    if (isCreating) {
      modal.confirm({
        title: 'Вы создаёте нового сотрудника',
        content: 'Несохранённые данные будут потеряны. Продолжить?',
        okText: 'Да',
        cancelText: 'Отмена',
        onOk: () => clearEmployee(),
      });
    } else {
      clearEmployee();
    }
  };

  return { safeSetEmployee, safeClearEmployee };
}
