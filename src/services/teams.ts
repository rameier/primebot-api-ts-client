import { BaseApiClient } from '../client/base';
import { Team, TeamDetail, PaginatedTeamList, TeamsQueryParams } from '../types';

export class TeamsService extends BaseApiClient {
  /**
   * List teams with optional filters
   */
  async listTeams(params?: TeamsQueryParams): Promise<PaginatedTeamList> {
    const path = this.buildUrl('/api/v1/teams/', params);
    return this.request<PaginatedTeamList>(path);
  }

  /**
   * Get team details by ID
   */
  async getTeam(id: number): Promise<TeamDetail> {
    return this.request<TeamDetail>(`/api/v1/teams/${id}/`);
  }

  /**
   * Get all teams (handles pagination automatically)
   */
  async getAllTeams(params?: Omit<TeamsQueryParams, 'page'>): Promise<Team[]> {
    const allTeams: Team[] = [];
    let page = 1;
    let hasMore = true;
    const MAX_PAGES = 1000;

    while (hasMore && page <= MAX_PAGES) {
      const response = await this.listTeams({ ...params, page });
      allTeams.push(...response.results);

      hasMore = response.next !== null;
      page++;
    }

    return allTeams;
  }

  /**
   * Search teams by name or other criteria
   */
  async searchTeams(
    searchTerm: string,
    additionalParams?: Omit<TeamsQueryParams, 'search'>
  ): Promise<PaginatedTeamList> {
    return this.listTeams({ ...additionalParams, search: searchTerm });
  }

  /**
   * Get teams by name (exact match)
   */
  async getTeamsByName(
    name: string,
    additionalParams?: Omit<TeamsQueryParams, 'name'>
  ): Promise<PaginatedTeamList> {
    return this.listTeams({ ...additionalParams, name });
  }

  /**
   * Get teams by team tag
   */
  async getTeamsByTag(
    teamTag: string,
    additionalParams?: Omit<TeamsQueryParams, 'team_tag'>
  ): Promise<PaginatedTeamList> {
    return this.listTeams({ ...additionalParams, team_tag: teamTag });
  }

  /**
   * Get teams by division
   */
  async getTeamsByDivision(
    division: string,
    additionalParams?: Omit<TeamsQueryParams, 'division'>
  ): Promise<PaginatedTeamList> {
    return this.listTeams({ ...additionalParams, division });
  }

  /**
   * Get team with full details including players and matches
   */
  async getTeamWithDetails(id: number): Promise<TeamDetail> {
    return this.getTeam(id);
  }

  /**
   * Get teams ordered by match count
   */
  async getTeamsOrderedByMatches(
    ascending: boolean = false,
    additionalParams?: Omit<TeamsQueryParams, 'ordering'>
  ): Promise<PaginatedTeamList> {
    const ordering = ascending ? 'matches_count' : '-matches_count';
    return this.listTeams({ ...additionalParams, ordering });
  }

  /**
   * Get teams ordered by name
   */
  async getTeamsOrderedByName(
    ascending: boolean = true,
    additionalParams?: Omit<TeamsQueryParams, 'ordering'>
  ): Promise<PaginatedTeamList> {
    const ordering = ascending ? 'name' : '-name';
    return this.listTeams({ ...additionalParams, ordering });
  }
}
