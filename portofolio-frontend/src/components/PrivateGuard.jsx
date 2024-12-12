// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'; // 👈 3 en 4
import { useAuth } from '../contexts/auth'; // 👈 2

// 👇 1
export default function PrivateGuard() {
  const { ready, isAdmin } = useAuth(); // 👈 2

  // 👇 2
  if (!ready) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>Loading...</h1>
            <p>
              Please wait while we are checking your credentials and loading the
              application.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 👇 3
  if (isAdmin) {
    return <Outlet />;
  }

  return <Navigate replace to={'/aandelen'} />; // 👈 4
}
