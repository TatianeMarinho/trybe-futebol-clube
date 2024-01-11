import * as jwt from 'jsonwebtoken';
import SequelizeUser from '../database/models/SequelizeUser';

const secret = process.env.JWT_SECRET || 'secretpassword';

const token = (user: Omit<SequelizeUser, 'password'>): string => {
  const newToken = jwt.sign(user, secret);
  return newToken;
};

export default token;
