export type UserRole = 'attendee' | 'organizer' | 'admin' | 'check-in';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface EventItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
}
