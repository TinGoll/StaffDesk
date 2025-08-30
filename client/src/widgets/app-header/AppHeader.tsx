import { css } from '@emotion/css';
import { Tabs, type TabsProps } from 'antd';
import { type FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { ROUTES } from '@app/routes/routes';
import { Logo } from '@shared/ui/Logo';

const styles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  border-bottom: 1px solid var(--app-devider-color);
  background-color: var(--app-header-background-color);
  & .ant-tabs {
    & .ant-tabs-nav {
      margin: 0;
    }
  }
`;

const items: TabsProps['items'] = [
  {
    key: ROUTES.employees,
    label: 'Сотрудники',
  },
  {
    key: ROUTES.assemblyWork,
    label: 'Работы по сборке',
  },
];

export const AppHeader: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles}>
      <Logo />
      <Tabs
        items={items}
        activeKey={location.pathname}
        onChange={(key) => navigate(key)}
      />
    </div>
  );
};
