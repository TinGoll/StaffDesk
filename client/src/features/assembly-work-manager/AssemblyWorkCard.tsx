import { css } from '@emotion/css';
import { App, InputNumber, Skeleton, Typography } from 'antd';
import type { AxiosError } from 'axios';
import { useState, type FC } from 'react';

import { useAssemblyWorks } from '@entities/assembly-work/api/useAssemblyWorks';
import { CardFieldRow, CardLayout } from '@shared/ui/CardLayout';
import { Editable } from '@shared/ui/editable';

const containerStyles = css`
  min-width: 320px;
  width: 320px;

  & .assembly-work-row {
    background-color: #202020;
    padding: 4px;
    padding-left: 8px;
    border-radius: 4px;
  }
`;

const editableStyles = css`
  &:hover {
    & .editable-content {
      color: #10b0fa;
    }
  }
  min-width: 80px;
  & .editable-content {
    display: flex;
    justify-content: flex-end;
  }

  & .editable-control {
    width: 30px;
  }

  & .input-number {
    width: 30px;
  }
`;

const textStyles = css`
  font-size: 16px;
  line-height: 22px;
`;

const { Text } = Typography;

export const AssemblyWorkCard: FC = () => {
  const { notification } = App.useApp();
  const { data, isLoading, update } = useAssemblyWorks();
  const [updatableID, serUpdatableID] = useState<string | number | null>(null);
  const { trigger, isMutating } = update;
  const works = data?.works;

  const loading = isLoading || !works;
  const handleUpdate = (id: string, value?: number): void => {
    if (!id) {
      return;
    }
    serUpdatableID(id);
    trigger(id, {
      price: value,
    })
      .then(() =>
        notification.success({
          message: 'Готово! Цена обновлена',
        }),
      )
      .catch((error: AxiosError) => {
        notification.error({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: `Ошибка: ${(error.response?.data as any)?.message} Цена не обновлена.`,
        });
      })
      .finally(() => serUpdatableID(null));
  };

  return (
    <CardLayout
      className={containerStyles}
      name="Редактировать цены Сборки"
      fields={
        <Skeleton active loading={loading}>
          {works?.map((work) => {
            const updateLoading = updatableID === work.id && isMutating;
            return (
              <CardFieldRow className='assembly-work-row' key={work.id} label={work.name}>
                <Editable
                  loading={updateLoading}
                  className={editableStyles}
                  confirmOnBlur
                  defaultValue={work.price}
                  onSave={handleUpdate}
                  control={
                    <InputNumber
                      style={{ width: 68 }}
                      className="input-number"
                      size="small"
                      variant="filled"
                    />
                  }
                  name={String(work.id)}
                >
                  <Text className={textStyles}>
                    {new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(work.price)}
                  </Text>
                </Editable>
              </CardFieldRow>
            );
          })}
        </Skeleton>
      }
    />
  );
};
