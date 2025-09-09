import { PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Divider,
  Input,
  Select,
  Tag,
  Typography,
  type SelectProps,
} from 'antd';
import type { FC } from 'react';

import type { Employee } from '@shared/contracts/employees.contract';
import type { Sector } from '@shared/contracts/sector.contract';
import { CardFieldRow, CardLayout } from '@shared/ui/CardLayout';
import { Editable } from '@shared/ui/editable';
import { FormattedPhoneNumber } from '@shared/ui/phone-number';
import { clean, formatCardNumber } from '@shared/utils/cardFormatter';

const dividerStyles = css`
  margin: 8px 0;
`;

const editableStyles = css`
  & .editable-content {
    display: flex;
    justify-content: flex-end;
  }

  & .editable-control {
    min-width: 80px;
  }

  & .editable-tag {
    margin: 0;
  }
`;

const { Text } = Typography;

export const EmployeeCardEdit: FC<{
  employee: Employee;
  sectors?: Sector[];
  onChange?: (patch: Partial<Employee>) => void;
}> = ({ employee, sectors, onChange }) => {
  const initials = employee?.firstName?.[0] ?? employee?.name?.[0] ?? '?';

  const departamentOptions: SelectProps['options'] = sectors?.map((sector) => ({
    label: sector.name,
    value: sector.id,
  }));

  const statusOption: SelectProps['options'] = [
    { value: -1, label: 'Уволен' },
    { value: 1, label: 'Работет' },
  ];

  const handleChange = (name: string, value?: string | number): void => {
    if (name === 'sectorId') {
      const item = sectors?.find((sector) => sector.id === Number(value));
      if (!item) {
        return;
      }
      onChange?.({
        sectorId: Number(value),
        department: item.name,
      });

      return;
    }
    onChange?.({
      [name]: value,
    });
  };

  return (
    <CardLayout
      avatar={initials}
      name={employee.name}
      fields={
        <>
          <CardFieldRow label="Отдел">
            <Editable
              key={`${employee.id}_sectorId`}
              className={editableStyles}
              confirmOnBlur
              defaultValue={employee.sectorId}
              control={
                <Select
                  variant="filled"
                  size="small"
                  value={employee.sectorId || undefined}
                  placeholder="Выбери отдел"
                  options={departamentOptions}
                />
              }
              onSave={handleChange}
              name="sectorId"
            >
              <Text className="editable-value">{employee.department}</Text>
            </Editable>
          </CardFieldRow>
          <Divider className={dividerStyles} />
          <CardFieldRow label="Фамилия">
            <Editable
              key={`${employee.id}_lastName`}
              className={editableStyles}
              name="lastName"
              confirmOnBlur
              defaultValue={employee.lastName}
              control={
                <Input
                  variant="filled"
                  size="small"
                  placeholder="Укажи фамилию"
                />
              }
              onSave={handleChange}
            >
              {employee.lastName ? (
                <Text className="editable-value">{employee.lastName}</Text>
              ) : (
                <Text className="editable-value" type="secondary">
                  Нажмите, чтобы заполнить
                </Text>
              )}
            </Editable>
          </CardFieldRow>
          <CardFieldRow label="Имя">
            <Editable
              key={`${employee.id}_firstName`}
              className={editableStyles}
              name="firstName"
              confirmOnBlur
              defaultValue={employee.firstName}
              control={
                <Input variant="filled" size="small" placeholder="Укажи имя" />
              }
              onSave={handleChange}
            >
              {employee.firstName ? (
                <Text className="editable-value">{employee.firstName}</Text>
              ) : (
                <Text className="editable-value" type="secondary">
                  Нажмите, чтобы заполнить
                </Text>
              )}
            </Editable>
          </CardFieldRow>
          <CardFieldRow label="Отчество">
            <Editable
              key={`${employee.id}_middleName`}
              className={editableStyles}
              name="middleName"
              confirmOnBlur
              defaultValue={employee.middleName}
              control={
                <Input
                  variant="filled"
                  size="small"
                  placeholder="Укажи отчество"
                />
              }
              onSave={handleChange}
            >
              {employee.middleName ? (
                <Text className="editable-value">{employee.middleName}</Text>
              ) : (
                <Text className="editable-value" type="secondary">
                  Нажмите, чтобы заполнить
                </Text>
              )}
            </Editable>
          </CardFieldRow>

          <Divider className={dividerStyles} />

          <CardFieldRow label="Статус">
            <Editable
              key={`${employee.id}_status`}
              className={editableStyles}
              confirmOnBlur
              defaultValue={employee.status}
              control={
                <Select
                  variant="filled"
                  size="small"
                  value={employee.status || undefined}
                  placeholder="Выбери отдел"
                  options={statusOption}
                />
              }
              onSave={handleChange}
              name="status"
            >
              <Text
                type={employee.status === 1 ? 'success' : 'warning'}
                className="editable-value"
              >
                {employee.status === 1 ? 'Работает' : 'Уволен'}
              </Text>
            </Editable>
          </CardFieldRow>
          <Divider className={dividerStyles} />
          <CardFieldRow label="Номер телефона">
            <Editable
              key={`${employee.id}_phone`}
              className={editableStyles}
              name="phone"
              confirmOnBlur
              defaultValue={employee.phone}
              control={
                <Input
                  variant="filled"
                  size="small"
                  placeholder="Укажи телефон"
                />
              }
              onSave={handleChange}
            >
              {employee.phone ? (
                <Text className="editable-value">
                  <Tag
                    icon={<PhoneOutlined />}
                    color="gold"
                    className="editable-tag"
                  >
                    <FormattedPhoneNumber phone={employee.phone} />
                  </Tag>
                </Text>
              ) : (
                <Text className="editable-value" type="secondary">
                  Нажмите, чтобы заполнить
                </Text>
              )}
            </Editable>
          </CardFieldRow>
          <CardFieldRow label="Банковская карта">
            <Editable
              key={`${employee.id}_bankCard`}
              className={editableStyles}
              name="bankCard"
              confirmOnBlur
              defaultValue={employee.bankCard}
              control={
                <Input
                  variant="filled"
                  size="small"
                  placeholder="Укажи телефон"
                />
              }
              onSave={handleChange}
            >
              {employee.bankCard ? (
                <Text className="editable-value">
                  <Tag
                    icon={<IdcardOutlined />}
                    color="cyan"
                    className="editable-tag"
                  >
                    {formatCardNumber(clean(employee.bankCard))}
                  </Tag>
                </Text>
              ) : (
                <Text className="editable-value" type="secondary">
                  Нажмите, чтобы заполнить
                </Text>
              )}
            </Editable>
          </CardFieldRow>
          <CardFieldRow label="Держатель карты">
            <Editable
              key={`${employee.id}_cardHolder`}
              className={editableStyles}
              name="cardHolder"
              confirmOnBlur
              defaultValue={employee.cardHolder}
              control={
                <Input
                  variant="filled"
                  size="small"
                  placeholder="Укажи телефон"
                />
              }
              onSave={handleChange}
            >
              {employee.cardHolder ? (
                <Text type="success" className="editable-value">
                  {employee.cardHolder.toUpperCase()}
                </Text>
              ) : (
                <Text className="editable-value" type="secondary">
                  Нажмите, чтобы заполнить
                </Text>
              )}
            </Editable>
          </CardFieldRow>
        </>
      }
    />
  );
};
