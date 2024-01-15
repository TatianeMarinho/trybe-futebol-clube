import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/Token';

async function validateTokenMiddleware(req:Request, res: Response, next: NextFunction) {
  const codeToken = req.headers.authorization;

  if (!codeToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = codeToken.split(' ')[1] || codeToken.split(' ')[0];
  console.log(token);

  const verifyToken = jwtUtil.verify(token);

  if (verifyToken === 'Token must be a valid token') {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  if (req.method === 'GET') {
    req.body = verifyToken;
  }
  next();
}

export default validateTokenMiddleware;
