import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './routerProvider/Router.jsx';
import { RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </QueryClientProvider>
);
