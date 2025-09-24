# PrimeBot API TypeScript Client

A comprehensive TypeScript client for the PrimeBot API, providing information about teams, players, and matches from the Techniker Prime League.

## Features

- 🚀 **Fully typed** - Complete TypeScript support with interfaces for all API responses
- 🔐 **Multiple authentication methods** - Basic Auth, Cookie Auth, or no authentication
- 📄 **Pagination support** - Automatic handling of paginated responses
- 🛡️ **Error handling** - Custom error classes for different scenarios
- 🔍 **Rich querying** - Support for all API query parameters and filters
- 📦 **Modern ES modules** - Tree-shakeable and optimized for bundlers

## Installation

```bash
npm install primebot-api-ts-client
```

## Quick Start

```typescript
import { PrimeBotApiClient } from 'primebot-api-ts-client';

// Create client without authentication
const client = PrimeBotApiClient.withoutAuth();

// Get all teams
const teams = await client.teams.listTeams();
console.log(`Found ${teams.count} teams`);

// Get team details
const team = await client.teams.getTeam(123);
console.log(`Team: ${team.name} (${team.team_tag})`);

// Get matches
const matches = await client.matches.listMatches({
  match_type: 'league',
  closed: false,
});
```

## Authentication

### No Authentication

```typescript
const client = PrimeBotApiClient.withoutAuth();
```

### Basic Authentication

```typescript
const client = PrimeBotApiClient.withBasicAuth('username', 'password');
```

### Cookie Authentication

```typescript
const client = PrimeBotApiClient.withCookieAuth('your-session-id');
```

### Custom Configuration

```typescript
import { PrimeBotApiClient, BasicAuth } from 'primebot-api-ts-client';

const client = new PrimeBotApiClient({
  baseUrl: 'https://custom-api.example.com',
  auth: new BasicAuth('username', 'password'),
  timeout: 30000,
  userAgent: 'MyApp/1.0.0',
});
```

## API Reference

### Teams Service

#### List Teams

```typescript
// Get all teams with pagination
const teams = await client.teams.listTeams();

// Search teams
const searchResults = await client.teams.searchTeams('Team Name');

// Filter by division
const divisionTeams = await client.teams.getTeamsByDivision('Division 1');

// Get teams by tag
const taggedTeams = await client.teams.getTeamsByTag('TAG');

// Get all teams (handles pagination automatically)
const allTeams = await client.teams.getAllTeams();
```

#### Get Team Details

```typescript
// Get team with full details (players and matches)
const team = await client.teams.getTeam(123);

console.log(`Team: ${team.name}`);
console.log(`Players: ${team.players.length}`);
console.log(`Matches: ${team.matches.length}`);
```

#### Team Ordering

```typescript
// Order by match count (descending)
const topTeams = await client.teams.getTeamsOrderedByMatches();

// Order by name (ascending)
const sortedTeams = await client.teams.getTeamsOrderedByName();
```

### Matches Service

#### List Matches

```typescript
// Get all matches
const matches = await client.matches.listMatches();

// Filter matches
const filteredMatches = await client.matches.listMatches({
  match_type: 'league',
  closed: true,
  match_day: 5,
  team: 123,
});

// Get team matches
const teamMatches = await client.matches.getTeamMatches(123);

// Get matches by type
const leagueMatches = await client.matches.getMatchesByType('league');
const playoffMatches = await client.matches.getMatchesByType('playoff');

// Get closed matches only
const closedMatches = await client.matches.getClosedMatches();
```

#### Get Match Details

```typescript
// Get match by ID
const match = await client.matches.getMatch(456);

// Get match by match_id and team_id
const specificMatch = await client.matches.getMatchByMatchId({
  match_id: 789,
  team_id: 123,
});

console.log(`Match: ${match.team.name} vs ${match.enemy_team.name}`);
console.log(`Result: ${match.result}`);
console.log(`Team lineup: ${match.team_lineup.map(p => p.name).join(', ')}`);
```

#### Advanced Match Queries

```typescript
// Get all matches for analysis (handles pagination)
const allMatches = await client.matches.getAllMatches({
  match_type: 'league',
});

// Search matches
const searchResults = await client.matches.searchMatches('Team Name');

// Get matches by match day
const matchDayGames = await client.matches.getMatchesByMatchDay(3);
```

## Types

All API responses are fully typed. Here are the main interfaces:

```typescript
interface Team {
  readonly id: number;
  name?: string | null;
  team_tag?: string | null;
  readonly prime_league_link: string;
  matches_count: number;
  readonly updated_at: string;
}

interface TeamDetail extends Team {
  division?: string | null;
  logo_url?: string | null;
  players: Player[];
  matches: MatchForTeamDetails[];
}

interface Match {
  readonly id: number;
  match_id: number;
  readonly prime_league_link: string;
  result?: string | null;
  team: TeamForMatch;
  enemy_team: TeamForMatch;
}

interface MatchDetail extends Match {
  begin?: string | null;
  match_day?: number | null;
  match_type?: 'group' | 'league' | 'playoff' | '' | null;
  team_lineup: Player[];
  enemy_lineup: Player[];
}

interface Player {
  readonly id: number;
  summoner_name?: string | null;
  name: string;
  is_leader: boolean;
  readonly updated_at: string;
}
```

## Error Handling

The client provides specific error classes:

```typescript
import {
  PrimeBotApiError,
  AuthenticationError,
  NotFoundError,
  ValidationError,
  NetworkError,
} from 'primebot-api-ts-client';

try {
  const team = await client.teams.getTeam(999999);
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log('Team not found');
  } else if (error instanceof AuthenticationError) {
    console.log('Authentication failed');
  } else if (error instanceof NetworkError) {
    console.log('Network error occurred');
  } else if (error instanceof PrimeBotApiError) {
    console.log(`API error: ${error.message} (${error.statusCode})`);
  }
}
```

## Pagination

Handle paginated responses easily:

```typescript
// Manual pagination
let page = 1;
while (true) {
  const response = await client.teams.listTeams({ page });

  // Process teams
  response.results.forEach(team => {
    console.log(team.name);
  });

  // Check if there are more pages
  if (!response.next) break;
  page++;
}

// Automatic pagination (loads all results)
const allTeams = await client.teams.getAllTeams();
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/rameier/primebot-api-ts-client/issues) on GitHub.
Typescript Client for PrimeBot API
