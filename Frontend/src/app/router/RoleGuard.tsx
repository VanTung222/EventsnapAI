import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import type { UserRole } from '../../types';

type RoleGuardProps = {
  allowedRoles: UserRole[];
};

const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const canAccess = useAuthStore((state) => state.canAccess);
  const location = useLocation();

  if (!canAccess(allowedRoles)) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RoleGuard;