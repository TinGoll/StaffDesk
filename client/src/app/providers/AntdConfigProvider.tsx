import { ConfigProvider } from "antd";
import type { FC, ReactNode } from "react";
import ruRu from "antd/locale/ru_Ru";

type Props = {
  children: ReactNode;
};
export const AntdConfigProvider: FC<Props> = ({ children }) => {
  return (
    <ConfigProvider locale={ruRu} theme={{}}>
      {children}
    </ConfigProvider>
  );
};
