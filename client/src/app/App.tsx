import { BrowserRouter } from "react-router";
import { initializeDayjsConf } from "./providers/dayjs.conf";
import { routesElements } from "./routes/routesElements";
import type { FC } from "react";

initializeDayjsConf();

export const App: FC = () => {
  return <BrowserRouter>{routesElements()}</BrowserRouter>;
};
