import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { ApiError } from '../utils/ApiError';

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(401, 'Unauthorized'));
  }

  req.user = user;
  resolve();
};

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
  })
    .then(next)
    .catch((err) => next(err));
};

export default authGuard;
