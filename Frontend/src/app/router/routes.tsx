import { Navigate, type RouteObject } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import UserLayout from '../../layouts/UserLayout';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import CheckInLayout from '../../layouts/CheckInLayout';
import AdminLayout from '../../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import RoleGuard from './RoleGuard';
import HomePage from '../../pages/public/HomePage';
import EventDiscoveryPage from '../../pages/public/EventDiscoveryPage';
import EventDetailPage from '../../pages/public/EventDetailPage';
import AuthAccessPage from '../../pages/public/AuthAccessPage';
import AuthRecoveryPage from '../../pages/public/AuthRecoveryPage';
import OrganizerApplicationPage from '../../pages/public/OrganizerApplicationPage';

import DashboardPage from '../../pages/attendee/DashboardPage';
import ProfilePage from '../../pages/attendee/ProfilePage';
import NotificationsPage from '../../pages/attendee/NotificationsPage';
import AccountSecurityPage from '../../pages/attendee/AccountSecurityPage';
import MyEventsPage from '../../pages/attendee/MyEventsPage';
import FavoritesPage from '../../pages/attendee/FavoritesPage';
import WaitlistStatusPage from '../../pages/attendee/WaitlistStatusPage';
import EventRegistrationPage from '../../pages/attendee/EventRegistrationPage';
import TicketDetailPage from '../../pages/attendee/TicketDetailPage';
import SubmitFeedbackPage from '../../pages/attendee/SubmitFeedbackPage';
import OrganizerDashboard from '../../pages/organizer/OrganizerDashboard';
import OrganizerAIScanner from '../../pages/organizer/OrganizerAIScanner';
import EventOverview from '../../pages/organizer/EventOverview';
import CheckInDashboard from '../../pages/organizer/CheckInDashboard';
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
      { path: 'auth/login', element: <AuthAccessPage mode="login" /> },
      { path: 'auth/register', element: <AuthAccessPage mode="register" /> },
      { path: 'auth/forgot-password', element: <AuthRecoveryPage mode="forgot" /> },
      { path: 'auth/reset-password', element: <AuthRecoveryPage mode="reset" /> },
      { path: 'auth/verify-email', element: <AuthRecoveryPage mode="verify" /> },
      { path: 'login', element: <Navigate to="/auth/login" replace /> },
      { path: 'register', element: <Navigate to="/auth/register" replace /> },
      { path: 'forgot-password', element: <Navigate to="/auth/forgot-password" replace /> },
      { path: 'reset-password', element: <Navigate to="/auth/reset-password" replace /> },
      { path: 'verify-email', element: <Navigate to="/auth/verify-email" replace /> },
      { path: 'organizer-apply', element: <OrganizerApplicationPage /> },

    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGuard allowedRoles={['attendee']} />,
        children: [
          {
            path: '/attendee',
            element: <UserLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: 'dashboard', element: <DashboardPage /> },
              { path: 'profile', element: <ProfilePage /> },
              { path: 'notifications', element: <NotificationsPage /> },
              { path: 'security', element: <AccountSecurityPage /> },
              { path: 'my-events', element: <MyEventsPage /> },
              { path: 'favorites', element: <FavoritesPage /> },
              { path: 'waitlist-status', element: <WaitlistStatusPage /> },
              { path: 'register', element: <EventRegistrationPage /> },
              { path: 'ticket', element: <TicketDetailPage /> },
              { path: 'feedback', element: <SubmitFeedbackPage /> },
            ],
          },
        ],
      },
      {
        element: <RoleGuard allowedRoles={['organizer']} />,
        children: [
          {
            path: '/organizer',
            element: <OrganizerLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: 'dashboard', element: <OrganizerDashboard /> },
              { path: 'events', element: <EventOverview /> },
              { path: 'ai-scanner', element: <OrganizerAIScanner /> },
              { path: 'check-in', element: <CheckInDashboard /> },
            ],
          },
        ],
      },
      {
        element: <RoleGuard allowedRoles={['check-in']} />,
        children: [
          {
            path: '/check-in',
            element: <CheckInLayout />,
            children: [{ index: true, element: <CheckInPage /> }],
          },
        ],
      },
      {
        element: <RoleGuard allowedRoles={['admin']} />,
        children: [
          {
            path: '/admin',
            element: <AdminLayout />,
            children: [{ index: true, element: <AdminPage /> }],
          },
        ],
      },
    ],
  },
];