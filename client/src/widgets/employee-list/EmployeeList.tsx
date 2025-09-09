import { Skeleton, Typography } from 'antd';
import {
  memo,
  useMemo,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from 'react';
import { Virtuoso } from 'react-virtuoso';

import { EmployeeListItem, useEmployees } from '@entities/employee';
import {
  useCurrentEmployee,
  useSafeEmployeeActions,
} from '@features/employee-manager';

import { employeeListStyles } from './employeeList.styles';

const { Text } = Typography;
const MemoEmployeeListItem = memo(EmployeeListItem);

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
  const selectedEmployee = useCurrentEmployee();
  const { data: employeeData, isLoading } = useEmployees();
  const { safeSetEmployee } = useSafeEmployeeActions();
  const employees = useMemo(() => {
    if (!employeeData?.items) {
      return [];
    }
    const sortedEmployees = [...employeeData.items].sort((a, b) => b.id - a.id);
    return sortedEmployees;
  }, [employeeData?.items]);

  return (
    <div className={employeeListStyles}>
      <div className="employee-list-header">
        <Text className="header-title">Список сотрудников</Text>
      </div>
      <div className="employee-list">
        <Skeleton loading={isLoading} active>
          <Virtuoso
            data={employees}
            totalCount={employees?.length}
            itemContent={(_, employee) => {
              const selected =
                selectedEmployee && 'id' in selectedEmployee
                  ? selectedEmployee.id === employee.id
                  : false;
              return (
                <MemoEmployeeListItem
                  key={employee.id}
                  employee={employee}
                  onEdit={safeSetEmployee}
                  selected={selected}
                />
              );
            }}
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
