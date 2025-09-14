import { css } from '@emotion/css';
import { App, Skeleton } from 'antd';
import { type FC } from 'react';

import { computeFullName, useEmployees } from '@entities/employee';
import { usePermissionsGroup } from '@entities/permissions-group/api/permissionsGroup.api';
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

  const { data: permissionsGroupData, isLoading: permissionsGroupIsLoading } =
    usePermissionsGroup();
  const permissions = permissionsGroupData?.items ?? [];

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

  const handleEdit = (id: number, patch: Partial<Employee>) => {
    const fullName = computeFullName({ ...employee, ...patch });
    const payload = { ...patch, name: fullName };

    updateEmployee(patch);

    updater(id, payload).then(() => {
      notification.success({
        message: 'Готово! Пользователь обновлен',
      });
    });
  };

  const isLoading = permissionsGroupIsLoading || sectorsIsLoading;

  if (!employee) {
    return (
      <Skeleton active loading={isLoading}>
        <CurrentEmployeeEmpty />
      </Skeleton>
    );
  }
  return (
    <Skeleton active loading={isLoading}>
      <div className={styles}>
        {isEditing ? (
          <EmployeeCardEdit
            sectors={sectors}
            employee={employee as Employee}
            permissions={permissions}
            onChange={handleEdit}
          />
        ) : (
          <EmployeeCardCreate
            loading={createIsMutate}
            sectors={sectors}
            employee={employee}
            permissions={permissions}
            onChange={handleChange}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        )}
      </div>
    </Skeleton>
  );
};
