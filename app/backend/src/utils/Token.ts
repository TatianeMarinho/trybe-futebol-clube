import { verify, sign, Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
import SequelizeUser from '../database/models/SequelizeUser';

export default class jwtUtil {
  static secret: Secret = process.env.JWT_SECRET || 'secretpassword';

  static jwtConfig: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  static token = (user: Omit<SequelizeUser, 'password'>): string => {
    const newToken = sign(user, jwtUtil.secret, jwtUtil.jwtConfig);
    return newToken;
  };

  static verify = (codeToken: string): JwtPayload | string => {
    try {
      const decoded = verify(codeToken, jwtUtil.secret) as JwtPayload;
      console.log(decoded);
      return decoded;
    } catch (err) {
      console.log(err);
      return 'erro';
    }
  };
}
