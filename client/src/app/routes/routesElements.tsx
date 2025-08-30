import type { JSX } from 'react';
import { Route, Routes } from 'react-router';

import { AssemblyWorkPage } from '@pages/AssemblyWorkPage';
import { EmployeesPage } from '@pages/EmployeesPage';
import { HomePage } from '@pages/HomePage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { AppLayout, DashboardLayout } from '@shared/layouts';
import { AppHeader } from '@widgets/app-header/AppHeader';

import { ROUTES } from './routes';

export const routesElements = (): JSX.Element => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route element={<DashboardLayout navbar={<AppHeader />} />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.assemblyWork} element={<AssemblyWorkPage />} />
        <Route path={ROUTES.employees} element={<EmployeesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  </Routes>
);
