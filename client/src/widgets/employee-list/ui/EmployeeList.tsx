import { css } from '@emotion/css';
import { Skeleton, Typography } from 'antd';
import {
  memo,
  useMemo,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from 'react';
import { Virtuoso } from 'react-virtuoso';

import { EmployeeCard, useEmployees } from '@entities/employee';

const styles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  background-color: var(--app-header-background-color);
  flex: 1;

  & .employee-list-header {
    position: sticky;
    top: 0;
    left: 0;
    border-bottom: 1px solid var(--app-devider-color);
    background-color: var(--app-body-background-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    padding: 0 8px;
    height: var(--app-header-height);
    & .header-title {
      font-size: 16px;
      font-weight: 600;
    }
  }

  & .employee-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    flex: 1;
  }
`;
const { Text } = Typography;
const MemoEmployeeCard = memo(EmployeeCard);

const ItemContainer = ({
  ref,
  children,
  style,
  ...rest
}: { children?: ReactNode } & ComponentPropsWithoutRef<'div'> & {
    ref?: React.RefObject<HTMLDivElement | null>;
  }) => (
  <div ref={ref} style={{ ...style, marginBottom: 8 }} {...rest}>
    {children}
  </div>
);
export const EmployeeList: FC = () => {
  const { data: employeeData, isLoading } = useEmployees();
  const employees = useMemo(() => {
    if (!employeeData?.items) {
      return [];
    }
    const sortedEmployees = [...employeeData.items].sort((a, b) => b.id - a.id);
    return sortedEmployees;
  }, [employeeData?.items]);

  return (
    <div className={styles}>
      <div className="employee-list-header">
        <Text className="header-title">Сотрудники</Text>
      </div>
      <div className="employee-list">
        <Skeleton loading={isLoading} active>
          <Virtuoso
            data={employees}
            totalCount={employees?.length}
            itemContent={(_, employee) => (
              <MemoEmployeeCard key={employee.id} employee={employee} />
            )}
            components={{
              Item: ItemContainer,
            }}
            // eslint-disable-next-line prettier/prettier
            style={{ height: "100%" }}
          />
        </Skeleton>
      </div>
    </div>
  );
};
