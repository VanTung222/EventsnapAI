import { Navigate, Outlet } from 'react-router-dom';

type RoleGuardProps = {
  allowedRoles: Array<'attendee' | 'organizer' | 'admin' | 'check-in'>;
  role?: 'attendee' | 'organizer' | 'admin' | 'check-in';
};

const RoleGuard = ({ allowedRoles, role = 'attendee' }: RoleGuardProps) => {
  const canAccess = allowedRoles.includes(role);

  if (!canAccess) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
