import { Alert } from 'antd';
import { type FC } from 'react';

export const CurrentEmployeeEmpty: FC = () => {
  return (
    <div>
      <Alert
        banner
        type="warning"
        message="Здесь пока никого нет. Добавьте нового сотрудника или выберите существующего для редактирования."
      />
    </div>
  );
};
