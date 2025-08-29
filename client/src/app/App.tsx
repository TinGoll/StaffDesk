import type { FC } from 'react';
import { BrowserRouter } from 'react-router';

import { initializeDayjsConf } from './providers/dayjs.conf';
import { routesElements } from './routes/routesElements';

initializeDayjsConf();

export const App: FC = () => {
  return <BrowserRouter>{routesElements()}</BrowserRouter>;
};
