import { AuthService, AuthUser } from '../types/auth';
import config from '../config';

class AuthServiceImpl implements AuthService {
  private clerkUser: any = null;
  private mockUser: AuthUser | null = null;

  async getCurrentUser(): Promise<AuthUser | null> {
    if (config.useMockData) {
      return this.mockUser;
    }

    if (!this.clerkUser) return null;

    return {
      id: this.clerkUser.id,
      name: this.clerkUser.fullName || 'Unknown User',
      email: this.clerkUser.primaryEmailAddress?.emailAddress || '',
      role: 'User',
      avatar: this.clerkUser.imageUrl || null,
      organizationId: this.clerkUser.organizationMemberships?.[0]?.organization?.id || null,
      phone: this.clerkUser.phoneNumbers?.[0]?.phoneNumber || '',
      department: '',  // These fields would need to be populated from your backend
      location: '',
      bio: '',
      company: this.clerkUser.organizationMemberships?.[0]?.organization?.name || '',
      socialLinks: {
        linkedin: '',
        twitter: ''
      }
    };
  }

  async setClerkUser(user: any): Promise<void> {
    this.clerkUser = user;
  }

  setMockUser(user: AuthUser): void {
    this.mockUser = user;
  }

  async logout(): Promise<void> {
    this.clerkUser = null;
    this.mockUser = null;
  }
}

export const authService = new AuthServiceImpl(); 