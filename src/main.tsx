import App from '@/App.tsx';
import '@/common/i18n';
import { routeTree } from '@/routeTree.gen.ts';
import '@/styles/tailwind.css';
import { createRouter } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';

const router = createRouter({ routeTree });

export type TanstackRouter = typeof router;

declare module '@tanstack/react-router' {
  interface Register {
    router: TanstackRouter;
  }
}

const rootElement = document.querySelector('#root') as Element;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <React.Suspense fallback='loading'>
        <App router={router} />
      </React.Suspense>
    </React.StrictMode>
  );
}
