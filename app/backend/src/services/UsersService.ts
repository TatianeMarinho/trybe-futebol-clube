import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../types/ServiceResponseType';
import IUser from '../Interfaces/user/IUser';
import UsersModel from '../models/UsersModel';
import token from '../utils/Token';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UsersService {
  constructor(private _usersModel = new UsersModel()) {
  }

  public async findOneUser(email: string, password: string):
  Promise<ServiceResponse<IUser>> {
    const user = await this._usersModel.findOneEmail(email);

    if (user && bcrypt.compareSync(password, user.dataValues.password)) {
      const { password: s, ...data } = user.dataValues;

      const codeToken = token(data as Omit<SequelizeUser, 'password'>);
      return { status: 'ok', data: { token: codeToken } };
    }
    return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
  }
}
