import { Navigate, type RouteObject } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import UserLayout from '../../layouts/UserLayout';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import CheckInLayout from '../../layouts/CheckInLayout';
import AdminLayout from '../../layouts/AdminLayout';
import HomePage from '../../pages/public/HomePage';
import LoginPage from '../../pages/public/LoginPage';
import RegisterPage from '../../pages/public/RegisterPage';
import DashboardPage from '../../pages/attendee/DashboardPage';
import ProfilePage from '../../pages/attendee/ProfilePage';
import NotificationsPage from '../../pages/attendee/NotificationsPage';
import AccountSecurityPage from '../../pages/attendee/AccountSecurityPage';
import EventsPage from '../../pages/organizer/EventsPage';
import CheckInPage from '../../pages/check-in/CheckInPage';
import AdminPage from '../../pages/admin/AdminPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/attendee',
    element: <UserLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'security', element: <AccountSecurityPage /> },
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