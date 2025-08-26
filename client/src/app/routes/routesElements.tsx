import type { JSX } from "react";
import { Route, Routes } from "react-router";
import { HomePage } from "@pages/HomePage";
import { NotFoundPage } from "@pages/NotFoundPage";

export const routesElements = (): JSX.Element => (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
