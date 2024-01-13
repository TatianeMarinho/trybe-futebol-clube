import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../types/ServiceResponseType';
import IUser from '../Interfaces/user/IUser';
import UsersModel from '../models/UsersModel';
import jwtUtil from '../utils/Token';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UsersService {
  constructor(private _usersModel = new UsersModel()) {
  }

  public async findOneUser(email: string, password: string):
  Promise<ServiceResponse<IUser>> {
    const user = await this._usersModel.findOneEmail(email);

    if (user && bcrypt.compareSync(password, user.dataValues.password)) {
      const codeToken = jwtUtil.token(user as Omit<SequelizeUser, 'password'>);
      return { status: 'ok', data: { token: codeToken } };
    }
    return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
  }

  public async UserRole(email: string): Promise<ServiceResponse<object>> {
    const user = await this._usersModel.findOneEmail(email);

    return { status: 'ok', data: { role: user?.dataValues.role } };
  }
}
