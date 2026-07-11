import { Navigate, type RouteObject } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import UserLayout from '../../layouts/UserLayout';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import CheckInLayout from '../../layouts/CheckInLayout';
import AdminLayout from '../../layouts/AdminLayout';
import HomePage from '../../pages/public/HomePage';
import EventDiscoveryPage from '../../pages/public/EventDiscoveryPage';
import EventDetailPage from '../../pages/public/EventDetailPage';
import AuthAccessPage from '../../pages/public/AuthAccessPage';
import AuthRecoveryPage from '../../pages/public/AuthRecoveryPage';
import DashboardPage from '../../pages/attendee/DashboardPage';
import EventsPage from '../../pages/organizer/EventsPage';
import CheckInPage from '../../pages/check-in/CheckInPage';
import AdminPage from '../../pages/admin/AdminPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'events', element: <EventDiscoveryPage /> },
      { path: 'events/:eventId', element: <EventDetailPage /> },
      { path: 'login', element: <AuthAccessPage mode="login" /> },
      { path: 'register', element: <AuthAccessPage mode="register" /> },
      { path: 'forgot-password', element: <AuthRecoveryPage mode="forgot" /> },
      { path: 'reset-password', element: <AuthRecoveryPage mode="reset" /> },
      { path: 'verify-email', element: <AuthRecoveryPage mode="verify" /> },
    ],
  },
  {
    path: '/attendee',
    element: <UserLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
    ],
  },
  {
    path: '/organizer',
    element: <OrganizerLayout />,
    children: [
      { index: true, element: <Navigate to="events" replace /> },
      { path: 'events', element: <EventsPage /> },
    ],
  },
  {
    path: '/check-in',
    element: <CheckInLayout />,
    children: [{ index: true, element: <CheckInPage /> }],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [{ index: true, element: <AdminPage /> }],
  },
];