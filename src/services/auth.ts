import api from './api';

interface OAuth2Token {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  provider: string;
  created_at: number;
}

interface TokenStorage {
  [provider: string]: OAuth2Token;
}

class AuthService {
  private static readonly TOKEN_STORAGE_KEY = 'oauth_tokens';
  private static readonly TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Get all stored tokens
  private static getStoredTokens(): TokenStorage {
    try {
      const tokens = localStorage.getItem(this.TOKEN_STORAGE_KEY);
      return tokens ? JSON.parse(tokens) : {};
    } catch (error) {
      console.error('Error reading tokens from storage:', error);
      return {};
    }
  }

  // Store tokens for a provider
  private static storeTokens(provider: string, tokens: OAuth2Token): void {
    try {
      const storedTokens = this.getStoredTokens();
      storedTokens[provider] = {
        ...tokens,
        created_at: Date.now()
      };
      localStorage.setItem(this.TOKEN_STORAGE_KEY, JSON.stringify(storedTokens));
    } catch (error) {
      console.error('Error storing tokens:', error);
    }
  }

  // Remove tokens for a provider
  private static removeTokens(provider: string): void {
    try {
      const storedTokens = this.getStoredTokens();
      delete storedTokens[provider];
      localStorage.setItem(this.TOKEN_STORAGE_KEY, JSON.stringify(storedTokens));
    } catch (error) {
      console.error('Error removing tokens:', error);
    }
  }

  // Check if tokens are expired or about to expire
  private static isTokenExpired(token: OAuth2Token): boolean {
    const now = Date.now();
    const expiresAt = token.created_at + (token.expires_in * 1000);
    return now >= (expiresAt - this.TOKEN_REFRESH_THRESHOLD);
  }

  // Get valid access token for a provider
  public static async getAccessToken(provider: string): Promise<string | null> {
    const storedTokens = this.getStoredTokens();
    const token = storedTokens[provider];

    if (!token) {
      return null;
    }

    if (this.isTokenExpired(token)) {
      try {
        const refreshedToken = await this.refreshToken(provider);
        return refreshedToken?.access_token || null;
      } catch (error) {
        console.error('Error refreshing token:', error);
        this.removeTokens(provider);
        return null;
      }
    }

    return token.access_token;
  }

  // Refresh token for a provider
  private static async refreshToken(provider: string): Promise<OAuth2Token | null> {
    const storedTokens = this.getStoredTokens();
    const token = storedTokens[provider];

    if (!token?.refresh_token) {
      return null;
    }

    try {
      const response = await api.post(`/auth/${provider}/refresh`, {
        refresh_token: token.refresh_token
      });

      const newTokens = response.data;
      this.storeTokens(provider, newTokens);
      return newTokens;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.removeTokens(provider);
      return null;
    }
  }

  // Store new tokens for a provider
  public static storeNewTokens(provider: string, tokens: OAuth2Token): void {
    this.storeTokens(provider, tokens);
  }

  // Remove tokens for a provider
  public static removeProviderTokens(provider: string): void {
    this.removeTokens(provider);
  }

  // Check if a provider is connected
  public static isProviderConnected(provider: string): boolean {
    const storedTokens = this.getStoredTokens();
    return !!storedTokens[provider];
  }

  // Get all connected providers
  public static getConnectedProviders(): string[] {
    const storedTokens = this.getStoredTokens();
    return Object.keys(storedTokens);
  }
}

export default AuthService; 