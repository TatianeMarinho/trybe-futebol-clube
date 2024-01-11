import { IFindOneEmail } from '../Interfaces/IModels';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UsersModel implements IFindOneEmail<SequelizeUser> {
  private _usersModel = SequelizeUser;

  public async findOneEmail(email: string): Promise<SequelizeUser | null> {
    const user = await this._usersModel.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
