import type { FC } from 'react';
import { Navigate } from 'react-router';

import { ROUTES } from '@app/routes/routes';

export const HomePage: FC = () => {
  return <Navigate to={ROUTES.employees} replace />;
};
