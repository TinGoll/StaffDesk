import { css } from '@emotion/css';
import { Button, Typography } from 'antd';
import type { FC } from 'react';

import {
  useIsCreatingEmployee,
  createNewEmployee,
  EmployeeManager,
} from '@features/employee-manager';

const styles = css`
  height: 100%;
  background-color: var(--app-header-background-color);
  display: flex;
  flex-direction: column;
  & .employee-wiew-header {
    position: sticky;
    top: 0;
    left: 0;
    border-bottom: 1px solid var(--app-devider-color);
    background-color: var(--app-body-background-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    padding: 0 16px;
    height: var(--app-header-height);
    & .header-title {
      font-size: 16px;
      font-weight: 600;
    }
    & .header-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
    }
  }
  & .employee-wiew-body {
    flex: 1;
    box-sizing: border-box;
    & .card-box {
      display: flex;
      justify-content: center;
      padding-top: 28px;
    }
  }
`;

const { Text } = Typography;

export const EmployeeView: FC = () => {
  const isCreating = useIsCreatingEmployee();
  return (
    <div className={styles}>
      <div className="employee-wiew-header">
        <Text className="header-title">
          Сотрудники: добавление и редактирование
        </Text>
        <div className="header-actions">
          <Button
            onClick={createNewEmployee}
            disabled={isCreating}
            color="primary"
            variant="solid"
          >
            Добавить нового сотрудника
          </Button>
        </div>
      </div>
      <div className="employee-wiew-body">
        <div className="card-box">
          <EmployeeManager />
        </div>
      </div>
    </div>
  );
};
