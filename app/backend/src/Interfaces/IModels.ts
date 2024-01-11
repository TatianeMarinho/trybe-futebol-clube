export interface IFindAll<T> {
  findAll(): Promise<T[]>
}

export interface IFindPk<T> {
  findById(id: number): Promise<T | null>;
}

export interface IFindOneEmail<T> {
  findOneEmail(email: string): Promise<T | null>;
}

export interface IModelTeams<T> extends IFindAll<T>, IFindPk<T> {}
