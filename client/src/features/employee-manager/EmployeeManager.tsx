import { css } from '@emotion/css';
import { App, Skeleton } from 'antd';
import { useEffect, type FC } from 'react';

import { useEmployees } from '@entities/employee';
import { useSectors } from '@entities/sector';
import type { Employee } from '@shared/contracts/employees.contract';

import { useSafeEmployeeActions } from './hooks/useSafeEmployeeActions';
import {
  setEmployee,
  updateEmployee,
  useCurrentEmployee,
  useEmployeeErrors,
  useIsEditingEmployee,
} from './model/selectors';
import { CurrentEmployeeEmpty } from './ui/CurrentEmployeeEmpty';
import { EmployeeCardCreate } from './ui/EmployeeCardCreate';
import { EmployeeCardEdit } from './ui/EmployeeCardEdit';

const styles = css`
  position: relative;
`;

export const EmployeeManager: FC = () => {
  const { message, notification } = App.useApp();
  const isEditing = useIsEditingEmployee();
  const errors = useEmployeeErrors();

  const employee = useCurrentEmployee();
  const { safeClearEmployee } = useSafeEmployeeActions();
  const { create, update } = useEmployees();
  const { trigger: creator, isMutating: createIsMutate } = create;
  const { trigger: updater } = update;

  const { data: sectorsData, isLoading: sectorsIsLoading } = useSectors();
  const sectors = sectorsData?.sectors;

  useEffect(() => {
    if (isEditing && employee && 'id' in employee) {
      updater(employee.id, { ...employee });
    }
  }, [employee, isEditing, updater]);

  const handleChange = (patch: Partial<Employee>): void => {
    updateEmployee(patch);
  };

  const handleCancel = (): void => {
    safeClearEmployee();
  };

  const handleSave = (): void => {
    const errorArr = Object.values(errors);
    if (errorArr?.length) {
      message.error({
        content: `Обязательные поля: ${errorArr.join(', ')}`,
      });
      return;
    }
    if (employee) {
      creator({ ...employee }).then((newEmployee) => {
        setEmployee(newEmployee);
        notification.success({
          message: 'Готово! Пользователь создан',
        });
      });
    }
  };

  const handleEdit = (patch: Partial<Employee>) => {
    updateEmployee(patch);
  };

  if (!employee) {
    return (
      <Skeleton active loading={sectorsIsLoading}>
        <CurrentEmployeeEmpty />
      </Skeleton>
    );
  }
  return (
    <Skeleton active loading={sectorsIsLoading}>
      <div className={styles}>
        {isEditing ? (
          <EmployeeCardEdit
            sectors={sectors}
            employee={employee as Employee}
            onChange={handleEdit}
          />
        ) : (
          <EmployeeCardCreate
            loading={createIsMutate}
            sectors={sectors}
            employee={employee}
            onChange={handleChange}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        )}
      </div>
    </Skeleton>
  );
};
