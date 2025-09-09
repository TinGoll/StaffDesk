import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Avatar, Button, Tag, Typography } from 'antd';
import type { BaseType } from 'antd/es/typography/Base';
import { useCallback, type FC } from 'react';

import type { Employee } from '@shared/contracts/employees.contract';
import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard';
import { maskCard, clean } from '@shared/utils/cardFormatter';

const styles = css`
  display: flex;
  align-items: center;
  border: 1px solid var(--app-devider-color);
  background-color: var(--app-body-background-color);
  padding: 8px;
  border-radius: 6px;
  gap: 16px;

  &.selected {
    background-color: #1669dc30;
  }

  & .employee-avatar {
    background: #1668dc;
  }

  & .employee-body {
    flex: 1;
    & .employee-body-top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;
      & .employee-title {
        font-size: 16px;
      }
      & .employe-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        & .ant-tag {
          cursor: pointer;
          margin: 0;
          display: inline-flex;
          padding: 2px 4px;
          span {
            font-size: 10px;
            line-height: 10px;
          }
          :hover {
            span {
              color: lightgreen;
            }
          }
        }
      }
    }

    & .employee-body-bottom {
      display: flex;
      gap: 4px;
    }
  }
  & .employee-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
  }
`;

const { Text } = Typography;
type EmployeeStatys = 0 | 1 | -1 | 'default';
const statusMap: Record<EmployeeStatys, { color: BaseType; text: string }> = {
  0: {
    color: 'warning',
    text: 'Уволен',
  },
  1: {
    color: 'success',
    text: 'Работает',
  },
  '-1': {
    color: 'warning',
    text: 'Уволен',
  },
  default: {
    color: 'warning',
    text: 'Работает',
  },
};

type Props = {
  employee: Employee;
  selected?: boolean;
  onEdit?: (employee: Employee) => void;
  onDelete?: (id?: number) => void;
};

export const EmployeeListItem: FC<Props> = ({
  employee,
  selected,
  onEdit,
  onDelete,
}) => {
  const { copyToClipboard } = useCopyToClipboard();

  const status =
    statusMap[employee?.status as EmployeeStatys] ?? statusMap.default;

  const handleEdit = useCallback(() => {
    onEdit?.(employee);
  }, [employee, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete?.(employee?.id);
  }, [employee?.id, onDelete]);

  return (
    <div className={`${styles}${selected ? ' selected' : ''}`}>
      <Avatar
        size="large"
        className="employee-avatar"
        icon={<UserOutlined />}
      />
      <div className="employee-body">
        <div className="employee-body-top">
          <Text ellipsis className="employee-title">
            {employee?.name}
          </Text>
          <div className="employe-tags">
            {employee?.phone && (
              <Tag
                onClick={() => {
                  copyToClipboard(
                    employee?.phone ?? 'phone',
                    'Номер телефона скопирован в буфер обмена',
                  );
                }}
                icon={<PhoneOutlined />}
                color="gold"
              >
                <Text ellipsis>{employee?.phone}</Text>
              </Tag>
            )}
            {employee?.bankCard && (
              <Tag
                onClick={() => {
                  copyToClipboard(
                    employee?.bankCard ?? 'bankCard',
                    'Банковская карта скопирована в буфер обмена',
                  );
                }}
                icon={<IdcardOutlined />}
                color="cyan"
              >
                <Text ellipsis>{maskCard(clean(employee?.bankCard))}</Text>
              </Tag>
            )}
          </div>
        </div>
        <div className="employee-body-bottom">
          <Text type="secondary" className="employee-subtitle">
            {employee?.department}
          </Text>
          {employee?.status && (
            <Text type={status.color} className="employee-status">
              ({status.text})
            </Text>
          )}
        </div>
      </div>
      <div className="employee-actions">
        <Button onClick={handleEdit} icon={<EditOutlined />} />
        <Button onClick={handleDelete} disabled icon={<DeleteOutlined />} />
      </div>
    </div>
  );
};
