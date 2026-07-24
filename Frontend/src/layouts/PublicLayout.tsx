import { Outlet, useLocation } from 'react-router-dom';
import { AppFooter, AppHeader } from '../components/AppChrome';

const authPaths = new Set(['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password', '/auth/verify-email']);


const PublicLayout = () => {
  const { pathname } = useLocation();

  if (authPaths.has(pathname)) {
    return <Outlet />;
  }

  return (
    <div className="app-public-shell">
      <AppHeader variant="public" />
      <main className="app-public-main">

        <Outlet />
      </main>
      <AppFooter variant="public" />
    </div>
  );
};

export default PublicLayout;