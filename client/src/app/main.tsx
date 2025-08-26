import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AntdConfigProvider } from "./providers/AntdConfigProvider.tsx";

import "./reset.css";
import "./index.css";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdConfigProvider>
      <App />
    </AntdConfigProvider>
  </StrictMode>
);
