import { PrimeBotApiClient } from '../src';

async function examples() {
  // Create client without authentication
  const client = PrimeBotApiClient.withoutAuth();

  try {
    // Example 1: Get all teams
    console.log('=== Getting teams ===');
    const teams = await client.teams.listTeams({ page: 1 });
    console.log(`Found ${teams.count} teams total`);

    if (teams.results.length > 0) {
      const firstTeam = teams.results[0];
      console.log(`First team: ${firstTeam.name} (ID: ${firstTeam.id})`);

      // Get detailed team information
      const teamDetail = await client.teams.getTeam(firstTeam.id);
      console.log(
        `Team details: ${teamDetail.players.length} players, ${teamDetail.matches.length} matches`
      );
    }

    // Example 2: Search for teams
    console.log('\n=== Searching teams ===');
    const searchResults = await client.teams.searchTeams('berlin');
    console.log(`Found ${searchResults.results.length} teams matching "berlin"`);

    // Example 3: Get matches
    console.log('\n=== Getting matches ===');
    const matches = await client.matches.listMatches({
      page: 1,
      match_type: 'league',
    });
    console.log(`Found ${matches.count} league matches total`);

    if (matches.results.length > 0) {
      const firstMatch = matches.results[0];
      console.log(`First match: ${firstMatch.team.name} vs ${firstMatch.enemy_team.name}`);

      // Get detailed match information
      const matchDetail = await client.matches.getMatch(firstMatch.id);
      console.log(
        `Match details: ${matchDetail.team_lineup.length} vs ${matchDetail.enemy_lineup.length} players`
      );
    }

    // Example 4: Get matches for a specific team
    if (teams.results.length > 0) {
      console.log('\n=== Getting team matches ===');
      const teamMatches = await client.matches.getTeamMatches(teams.results[0].id);
      console.log(`Team has ${teamMatches.results.length} matches`);
    }

    // Example 5: Get closed matches only
    console.log('\n=== Getting closed matches ===');
    const closedMatches = await client.matches.getClosedMatches({ page: 1 });
    console.log(`Found ${closedMatches.results.length} closed matches on first page`);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

export { examples };

// Uncomment the line below to run examples
// examples().catch(console.error);
