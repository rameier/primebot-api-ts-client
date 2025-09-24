// Base types and enums
export type MatchTypeEnum = 'group' | 'league' | 'playoff';
export type BlankEnum = '';
export type NullEnum = null;

// Player interface
export interface Player {
  readonly id: number;
  summoner_name?: string | null;
  name: string;
  is_leader: boolean;
  readonly updated_at: string;
}

// Team interfaces
export interface Team {
  readonly id: number;
  name?: string | null;
  team_tag?: string | null;
  readonly prime_league_link: string;
  matches_count: number;
  readonly updated_at: string;
}

export interface TeamDetail {
  readonly id: number;
  team_tag?: string | null;
  name?: string | null;
  readonly prime_league_link: string;
  division?: string | null;
  readonly updated_at: string;
  logo_url?: string | null;
  players: Player[];
  matches: MatchForTeamDetails[];
}

export interface TeamForMatch {
  readonly id: number;
  name?: string | null;
  team_tag?: string | null;
  readonly prime_league_link: string;
  logo_url?: string | null;
}

export interface EnemyTeam {
  readonly id: number;
  name?: string | null;
  readonly prime_league_link: string;
  team_tag?: string | null;
  readonly updated_at: string;
}

// Match interfaces
export interface Match {
  readonly id: number;
  match_id: number;
  readonly prime_league_link: string;
  result?: string | null;
  team: TeamForMatch;
  enemy_team: TeamForMatch;
}

export interface MatchDetail {
  readonly id: number;
  match_id: number;
  begin?: string | null;
  result?: string | null;
  readonly prime_league_link: string;
  match_day?: number | null;
  match_type?: MatchTypeEnum | BlankEnum | NullEnum | null;
  team_lineup: Player[];
  enemy_lineup: Player[];
  team: TeamForMatch;
  enemy_team: TeamForMatch;
}

export interface MatchForTeamDetails {
  readonly id: number;
  match_id: number;
  readonly prime_league_link: string;
  begin?: string | null;
  result?: string | null;
  match_day?: number | null;
  match_type?: MatchTypeEnum | BlankEnum | NullEnum | null;
  readonly updated_at: string;
  enemy_team: EnemyTeam;
  team_lineup: Player[];
  enemy_lineup: Player[];
}

// Pagination interfaces
export interface PaginatedResponse<T> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}

export interface PaginatedMatchList extends PaginatedResponse<Match> {}
export interface PaginatedTeamList extends PaginatedResponse<Team> {}

// Query parameter interfaces
export interface MatchesQueryParams {
  closed?: boolean;
  enemy_team?: number;
  has_side_choice?: boolean;
  match_begin_confirmed?: boolean;
  match_day?: number;
  match_type?: MatchTypeEnum | null;
  ordering?: string;
  page?: number;
  result?: string;
  search?: string;
  team?: number;
  team_made_latest_suggestion?: boolean;
}

export interface TeamsQueryParams {
  division?: string;
  name?: string;
  ordering?: string;
  page?: number;
  search?: string;
  team_tag?: string;
}

export interface MatchByMatchIdQueryParams {
  match_id: number;
  team_id: number;
}
