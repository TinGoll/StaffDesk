import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App.tsx';
import { AntdConfigProvider } from './providers/AntdConfigProvider.tsx';

import './reset.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AntdConfigProvider>
      <App />
    </AntdConfigProvider>
  </StrictMode>,
);
