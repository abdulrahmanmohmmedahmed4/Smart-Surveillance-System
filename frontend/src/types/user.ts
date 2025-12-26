export type UserRole = 'admin' | 'operator' | 'viewer';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active?: boolean;
  last_login?: string;
}




