import * as jwt from 'jsonwebtoken';
import SequelizeUser from '../database/models/SequelizeUser';

const secret = process.env.JWT_SECRET || 'secretpassword';

export type TokenPayload = {
  id: number,
  username: string,
  email: string,
  role: string,
};

const token = (user: Omit<SequelizeUser, 'password'>): string => {
  const payload: TokenPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const newToken = jwt.sign(payload, secret);
  return newToken;
};

const verify = (codeToken: string): TokenPayload => {
  const decoded = jwt.verify(codeToken, secret) as TokenPayload;
  return decoded;
};

export default {
  token,
  verify,
};
