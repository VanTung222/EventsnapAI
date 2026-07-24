import { Outlet } from 'react-router-dom';
import { AppFooter, AppHeader } from '../components/AppChrome';
import '../pages/attendee/UserPages.css';

const UserLayout = () => {
  return (
    <div className="user-app">
      <AppHeader variant="user" />
      <Outlet />
      <AppFooter variant="user" />
    </div>
  );
};

export default UserLayout;