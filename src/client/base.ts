import { AuthProvider, NoAuth } from '../auth';
import {
  PrimeBotApiError,
  AuthenticationError,
  NotFoundError,
  ValidationError,
  NetworkError,
} from '../errors';

export interface ApiClientConfig {
  baseUrl?: string;
  auth?: AuthProvider;
  timeout?: number;
  userAgent?: string;
}

export class BaseApiClient {
  private baseUrl: string;
  private auth: AuthProvider;
  private timeout: number;
  private userAgent: string;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || 'https://primebot.me/api/v1';
    this.auth = config.auth || new NoAuth();
    this.timeout = config.timeout || 30000;
    this.userAgent = config.userAgent || 'PrimeBot-TS-Client/1.0.0';
  }

  protected async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = new URL(path, this.baseUrl);

    // Prevent SSRF: ensure the resolved URL stays on the expected origin
    const expectedOrigin = new URL(this.baseUrl).origin;
    if (url.origin !== expectedOrigin) {
      throw new ValidationError(`Invalid request path: URL origin mismatch`);
    }

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': this.userAgent,
      ...this.auth.getHeaders(),
      ...options.headers,
    };

    const requestOptions: RequestInit = {
      ...options,
      headers,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url.toString(), {
        ...requestOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof PrimeBotApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new NetworkError('Request timeout');
        }
        throw new NetworkError(`Network error: ${error.message}`);
      }

      throw new NetworkError('Unknown network error');
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    const contentType = response.headers.get('content-type');
    let errorData;

    try {
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }
    } catch {
      errorData = 'Unknown error';
    }

    const message =
      typeof errorData === 'object' && errorData.detail
        ? errorData.detail
        : typeof errorData === 'string'
          ? errorData
          : `HTTP ${response.status}: ${response.statusText}`;

    switch (response.status) {
      case 400:
        throw new ValidationError(message);
      case 401:
        throw new AuthenticationError(message);
      case 404:
        throw new NotFoundError(message);
      default:
        throw new PrimeBotApiError(message, response.status, errorData);
    }
  }

  protected buildUrl(path: string, params?: Record<string, any>): string {
    const url = new URL(path, this.baseUrl);

    // Prevent SSRF: ensure the resolved URL stays on the expected origin
    const expectedOrigin = new URL(this.baseUrl).origin;
    if (url.origin !== expectedOrigin) {
      throw new ValidationError(`Invalid request path: URL origin mismatch`);
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }
}
