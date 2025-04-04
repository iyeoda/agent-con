export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  organizationId: string | null;
}

export interface AuthService {
  getCurrentUser: () => AuthUser | null;
  setClerkUser: (user: any) => void;
  logout: () => void;
} 