import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AandeelList from './components/aandelen/AandeelList.jsx';
import AccountList from './components/accounts/AccountList.jsx';
import NotFound from './pages/NotFound';
import About, { Services, History, Location } from './pages/about/About.jsx';
import { Navigate } from 'react-router-dom';
import Layout from './pages/Layout.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />, // 👈
    // 👇
    children: [
      {
        path: '/',
        element: <Navigate replace to='/aandelen' />,
      },
      {
        path: '/aandelen',
        element: <AandeelList />,
      },
      {
        path: '/accounts',
        element: <AccountList />,
      },
      {
        path: 'about',
        element: <About />,
        children: [
          {
            path: 'services',
            element: <Services />,
          },
          {
            path: 'history',
            element: <History />,
          },
          {
            path: 'location',
            element: <Location />,
          },
        ],
      },
      {
        path: 'services',
        element: <Navigate to='/about/services' replace />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
