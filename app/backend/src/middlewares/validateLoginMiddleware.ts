import { NextFunction, Request, Response } from 'express';

function validateLoginMiddleware(req: Request, res: Response, next: NextFunction) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { email, password } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email invalido' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 digitos' });
  }

  next();
}

export default validateLoginMiddleware;
