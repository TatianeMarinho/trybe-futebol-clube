export default interface IFindAll<T> {
  findAll(): Promise<T[]>
}
