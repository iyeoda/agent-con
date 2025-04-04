export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  organizationId: string | null;
  phone: string;
  department: string;
  location: string;
  bio: string;
  company: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface AuthService {
  getCurrentUser: () => Promise<AuthUser | null>;
  setClerkUser: (user: any) => Promise<void>;
  logout: () => Promise<void>;
} 