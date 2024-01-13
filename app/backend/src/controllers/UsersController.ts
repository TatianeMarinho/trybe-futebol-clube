import { Request, Response } from 'express';
import HttpStatus from '../utils/HttpStatus';
import UsersService from '../services/UsersService';

export default class UsersController {
  constructor(private _usersService = new UsersService()) {
  }

  public async userLogin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const { status, data } = await this._usersService.findOneUser(email, password);
    return res.status(HttpStatus(status)).json(data);
  }

  public async getUserRole(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.user;

    const { status, data } = await this._usersService.UserRole(email);

    return res.status(HttpStatus(status)).json(data);
  }
}
