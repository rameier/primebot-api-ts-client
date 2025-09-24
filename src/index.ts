// Main API Client
export { PrimeBotApiClient } from './client';

// Services
export { MatchesService } from './services/matches';
export { TeamsService } from './services/teams';

// Types
export * from './types';

// Authentication
export { AuthProvider, NoAuth, BasicAuth, CookieAuth } from './auth';

// Errors
export {
  PrimeBotApiError,
  AuthenticationError,
  NotFoundError,
  ValidationError,
  NetworkError,
} from './errors';

// Client configuration
export { ApiClientConfig } from './client/base';

// Re-export for convenience
export { PrimeBotApiClient as default } from './client';
