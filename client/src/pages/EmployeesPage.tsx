import { css } from '@emotion/css';
import { type FC } from 'react';

import { EmployeeList } from '@widgets/employee-list';
import { EmployeeView } from '@widgets/employee-view';

const styles = css`
  display: flex;
  & .page-right-panel {
    display: flex;
    flex-direction: column;
    min-width: 660px;
    height: var(--app-body-height);
    overflow: auto;
  }

  & .page-main {
    flex: 1;
    height: var(--app-body-height);
    overflow: hidden;
    border-right: 1px solid var(--app-devider-color);
  }
`;

export const EmployeesPage: FC = () => {
  return (
    <div className={styles}>
      <div className="page-main">
        <EmployeeView />
      </div>
      <div className="page-right-panel">
        <EmployeeList />
      </div>
    </div>
  );
};
