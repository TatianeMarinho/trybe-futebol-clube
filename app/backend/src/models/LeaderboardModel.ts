import IMatch from '../Interfaces/match/IMatch';
import SequelizeMatch from '../database/models/sequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ILeaderboard, IModelLeaderboard } from '../Interfaces/leaderboard/IModelLeaderboard';
import { GoalsType, StatisticType } from '../types/LeaderboardType';

export default class LeaderboardModel implements IModelLeaderboard {
  private _matchModel = SequelizeMatch;
  private _teamModel = SequelizeTeam;

  private async models() {
    const matches = await this._matchModel.findAll({
      where: { inProgress: false },
    });
    const teams = await this._teamModel.findAll();

    return {
      matches,
      teams,
    };
  }

  // saldo de gols
  static goalsConcededScored(matches: IMatch[]): GoalsType {
    const goals = {
      conceded: 0, // sofrido GC
      scored: 0, // marcado GP
    };

    matches.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals } = match;

      goals.conceded += awayTeamGoals;
      goals.scored += homeTeamGoals;
    });

    return goals;
  }

  // placares de jogos
  static matchesPlayed(matches: IMatch[]): StatisticType {
    const statistic = {
      victories: 0, // vitorias V
      defeats: 0, // derrotas D
      draws: 0, // empates  E
    };

    matches.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals } = match;

      if (homeTeamGoals > awayTeamGoals) {
        statistic.victories += 1;
      }
      if (homeTeamGoals < awayTeamGoals) {
        statistic.defeats += 1;
      }
      if (homeTeamGoals === awayTeamGoals) {
        statistic.draws += 1;
      }
    });

    return statistic;
  }

  async homeLeaderboard(): Promise<ILeaderboard[]> {
    const { matches, teams } = await this.models();

    return teams.map((team) => {
      const filterHome = matches.filter((match) => (match.homeTeamId === team.id));

      // para calcular os saldos de gols do time da casa
      const goals = LeaderboardModel.goalsConcededScored(filterHome);
      // para calcular os placares do time da casa
      const gameScore = LeaderboardModel.matchesPlayed(filterHome);
      const efficiency = ((gameScore.victories * 3) + gameScore.draws) / filterHome.length;

      return { name: team.teamName,
        totalPoints: (gameScore.victories * 3) + gameScore.draws,
        totalGames: filterHome.length,
        totalVictories: gameScore.victories,
        totalDraws: gameScore.draws,
        totalLosses: gameScore.defeats,
        goalsFavor: goals.scored,
        goalsOwn: goals.conceded,
        goalsBalance: goals.scored - goals.conceded,
        efficiency: Number((efficiency * 100).toFixed(2)) };
    });
  }
}
