export default interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IReqMatches {
  homeTeamId: number, // O valor deve ser o id do time
  awayTeamId: number, // O valor deve ser o id do time
  homeTeamGoals: number,
  awayTeamGoals: number,
}
