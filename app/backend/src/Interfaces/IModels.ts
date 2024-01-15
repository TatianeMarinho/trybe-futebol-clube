import { IReqMatches } from './match/IMatch';

export interface IFindAll<T> {
  findAll(): Promise<T[]>
}

export interface IFindPk<T> {
  findById(id: number): Promise<T | null>;
}

export interface IFindOneEmail<T> {
  findOneEmail(email: string): Promise<T | null>;
}

export interface IUpdateProgressId<T> {
  updateProgressId(id: number): Promise< object | T>;
}

export interface IFindAllProgress<T> {
  findAll(): Promise<T>
}
export interface IfindIdMatches {
  updatedMatchesId(id: number, info: object): Promise<boolean | null>;
}

export interface Icreate<T> {
  createMatches(matchesInfo: IReqMatches): Promise<T | null>;
}

export interface IModelTeams<T> extends IFindAll<T>, IFindPk<T> {}

export interface IModelMatches<T> extends
  IFindAll<T>, IUpdateProgressId<T>, IfindIdMatches, Icreate<T> {}
