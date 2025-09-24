import { ApiClientConfig } from './base';
import { MatchesService } from '../services/matches';
import { TeamsService } from '../services/teams';
import { BasicAuth, CookieAuth } from '../auth';

export class PrimeBotApiClient {
  public readonly matches: MatchesService;
  public readonly teams: TeamsService;

  constructor(config: ApiClientConfig = {}) {
    this.matches = new MatchesService(config);
    this.teams = new TeamsService(config);
  }

  /**
   * Create a new API client instance with basic authentication
   */
  static withBasicAuth(username: string, password: string, baseUrl?: string): PrimeBotApiClient {
    const config: ApiClientConfig = {
      auth: new BasicAuth(username, password),
    };
    if (baseUrl) {
      config.baseUrl = baseUrl;
    }
    return new PrimeBotApiClient(config);
  }

  /**
   * Create a new API client instance with cookie authentication
   */
  static withCookieAuth(sessionId: string, baseUrl?: string): PrimeBotApiClient {
    const config: ApiClientConfig = {
      auth: new CookieAuth(sessionId),
    };
    if (baseUrl) {
      config.baseUrl = baseUrl;
    }
    return new PrimeBotApiClient(config);
  }

  /**
   * Create a new API client instance without authentication
   */
  static withoutAuth(baseUrl?: string): PrimeBotApiClient {
    const config: ApiClientConfig = {};
    if (baseUrl) {
      config.baseUrl = baseUrl;
    }
    return new PrimeBotApiClient(config);
  }
}
