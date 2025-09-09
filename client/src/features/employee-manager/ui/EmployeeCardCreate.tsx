import { css } from '@emotion/css';
import { Button, Input, Select, type SelectProps } from 'antd';
import type { FC } from 'react';

import type { Employee } from '@shared/contracts/employees.contract';
import type { Sector } from '@shared/contracts/sector.contract';
import { CardFieldRow, CardLayout } from '@shared/ui/CardLayout';

const imputStyles = css`
  min-width: 183px;
`;

const actionsStyled = css`
  display: flex;
  padding-top: 16px;
  justify-content: flex-end;
  gap: 6px;
`;

export const EmployeeCardCreate: FC<{
  employee: Partial<Employee>;
  sectors?: Sector[];
  loading?: boolean;
  onChange?: (patch: Partial<Employee>) => void;
  onSave?: () => void;
  onCancel?: () => void;
}> = ({ employee, sectors, loading, onChange, onCancel, onSave }) => {
  const initials = employee?.firstName?.[0] ?? employee?.name?.[0] ?? '?';

  const departamentOptions: SelectProps['options'] = sectors?.map((sector) => ({
    label: sector.name,
    value: sector.id,
  }));

  return (
    <CardLayout
      avatar={initials}
      name={employee.name || '__ __ __'}
      fields={
        <>
          <CardFieldRow label="Отдел">
            <Select
              variant="filled"
              value={employee.sectorId || undefined}
              placeholder="Выбери отдел"
              className={imputStyles}
              options={departamentOptions}
              onChange={(_, option) => {
                if (!Array.isArray(option)) {
                  onChange?.({
                    sectorId: Number(option?.value),
                    department: String(option?.label),
                  });
                }
              }}
            />
          </CardFieldRow>
          <CardFieldRow label="Фамилия">
            <Input
              variant="filled"
              className={imputStyles}
              value={employee.lastName}
              placeholder="Укажи фамилию"
              onChange={(e) => onChange?.({ lastName: e.target.value })}
            />
          </CardFieldRow>
          <CardFieldRow label="Имя">
            <Input
              variant="filled"
              className={imputStyles}
              value={employee.firstName}
              placeholder="Укажи имя"
              onChange={(e) => onChange?.({ firstName: e.target.value })}
            />
          </CardFieldRow>
          <CardFieldRow label="Отчество">
            <Input
              variant="filled"
              className={imputStyles}
              value={employee.middleName}
              placeholder="Укажи отчество"
              onChange={(e) => onChange?.({ middleName: e.target.value })}
            />
          </CardFieldRow>
          <div className={actionsStyled}>
            <Button onClick={onCancel} variant="solid" color="danger">
              Отмена
            </Button>
            <Button
              loading={loading}
              onClick={onSave}
              variant="solid"
              color="primary"
            >
              Добавить сотрудника
            </Button>
          </div>
        </>
      }
    />
  );
};
