import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AandeelList from './components/aandelen/AandeelList.jsx';
import NotFound from './pages/NotFound';
import About, { Services, History, Location } from './pages/about/About.jsx';
import { Navigate } from 'react-router-dom';
import Layout from './pages/Layout.jsx';
import AddOrEditAandeel from './pages/aandelen/AddOrEditAandelen.jsx';
import EditAccounts from './pages/accounts/EditAccounts.jsx';
import { ThemeProvider } from './contexts/Theme.context.jsx';
import { AuthProvider } from './contexts/Auth.context.jsx';
import Login from './pages/Login.jsx';
import PrivateRoute from './components/PrivateRoute';
import Logout from './pages/Logout.jsx';
import AccountAandeelList from './components/accountAandeel/accountAandeelList.jsx';
import AddOrEditAccountAandelen from './pages/accountAandelen/AddOrEditAccountAandelen.jsx';

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
        element: <PrivateRoute />, // 👈
        children: [
          {
            index: true,
            element: <AandeelList />,
          },
          {
            path: 'add',
            element: <AddOrEditAandeel />,
          },
          {
            path: 'edit/:id',
            element: <AddOrEditAandeel />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/accounts',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <EditAccounts />,
          },
        ],
      },
      {
        path: '/accounts/:accountId/aandelen',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <AccountAandeelList />,
          },
          {
            path: 'edit/:aandeelId',
            element: <AddOrEditAccountAandelen />,
          },
        ],
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
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
