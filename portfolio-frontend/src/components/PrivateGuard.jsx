import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

export default function PrivateGuard() {
  const { ready, isAdmin } = useAuth();

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

  if (isAdmin) {
    return <Outlet />;
  }

  return <Navigate replace to={'/aandelen'} />;
}
