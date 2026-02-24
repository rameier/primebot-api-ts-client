import { BaseApiClient } from '../client/base';
import type {
  Match,
  MatchDetail,
  PaginatedMatchList,
  MatchesQueryParams,
  MatchByMatchIdQueryParams,
} from '../types';

export class MatchesService extends BaseApiClient {
  /**
   * List matches with optional filters
   */
  async listMatches(params?: MatchesQueryParams): Promise<PaginatedMatchList> {
    const path = this.buildUrl('/api/v1/matches/', params);
    return this.request<PaginatedMatchList>(path);
  }

  /**
   * Get match details by ID
   */
  async getMatch(id: number): Promise<MatchDetail> {
    return this.request<MatchDetail>(`/api/v1/matches/${id}/`);
  }

  /**
   * Get match by match_id and team_id
   */
  async getMatchByMatchId(params: MatchByMatchIdQueryParams): Promise<Match> {
    const path = this.buildUrl('/api/v1/matches/by-match-id/', params);
    return this.request<Match>(path);
  }

  /**
   * Get all matches (handles pagination automatically)
   */
  async getAllMatches(params?: Omit<MatchesQueryParams, 'page'>): Promise<Match[]> {
    const allMatches: Match[] = [];
    let page = 1;
    let hasMore = true;
    const MAX_PAGES = 1000;

    while (hasMore && page <= MAX_PAGES) {
      const response = await this.listMatches({ ...params, page });
      allMatches.push(...response.results);

      hasMore = response.next !== null;
      page++;
    }

    return allMatches;
  }

  /**
   * Search matches by team name or other criteria
   */
  async searchMatches(
    searchTerm: string,
    additionalParams?: Omit<MatchesQueryParams, 'search'>
  ): Promise<PaginatedMatchList> {
    return this.listMatches({ ...additionalParams, search: searchTerm });
  }

  /**
   * Get matches for a specific team
   */
  async getTeamMatches(
    teamId: number,
    additionalParams?: Omit<MatchesQueryParams, 'team'>
  ): Promise<PaginatedMatchList> {
    return this.listMatches({ ...additionalParams, team: teamId });
  }

  /**
   * Get matches by match type
   */
  async getMatchesByType(
    matchType: 'group' | 'league' | 'playoff',
    additionalParams?: Omit<MatchesQueryParams, 'match_type'>
  ): Promise<PaginatedMatchList> {
    return this.listMatches({ ...additionalParams, match_type: matchType });
  }

  /**
   * Get closed matches only
   */
  async getClosedMatches(
    additionalParams?: Omit<MatchesQueryParams, 'closed'>
  ): Promise<PaginatedMatchList> {
    return this.listMatches({ ...additionalParams, closed: true });
  }

  /**
   * Get matches for a specific match day
   */
  async getMatchesByMatchDay(
    matchDay: number,
    additionalParams?: Omit<MatchesQueryParams, 'match_day'>
  ): Promise<PaginatedMatchList> {
    return this.listMatches({ ...additionalParams, match_day: matchDay });
  }
}
