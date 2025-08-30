import { ConfigProvider, theme } from 'antd';
import ruRu from 'antd/locale/ru_Ru';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const AntdConfigProvider: FC<Props> = ({ children }) => {
  return (
    <ConfigProvider locale={ruRu} theme={{ algorithm: theme.darkAlgorithm }}>
      {children}
    </ConfigProvider>
  );
};
