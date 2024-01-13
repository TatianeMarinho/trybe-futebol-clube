import { NextFunction, Request, Response } from 'express';
import jwtUtil, { TokenPayload } from '../utils/Token';

async function validateTokenMiddleware(req:Request, res: Response, next: NextFunction) {
  try {
    const codeToken = req.headers.authorization;

    if (codeToken) {
      const decodedToken = jwtUtil.verify(codeToken) as TokenPayload;
      req.body.user = decodedToken;
      next();
    }
  } catch (err) {
    console.error('Error during token validation', err);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default validateTokenMiddleware;
