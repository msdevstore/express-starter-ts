import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { catchAsync } from '../utils/helpers';
import * as tokenService from '../services/token.service';
import * as authService from '../services/auth.service';

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);
  const token = await tokenService.generateAuthTokens(user);

  return res.status(httpStatus.OK).send(token);
});

export const getAccount = catchAsync(async (req, res) => {
  const user = req.user;

  if (user) {
    return res.status(httpStatus.OK).send(user);
  } else {
    return res.status(httpStatus.FORBIDDEN).send({ message: 'Forbidden' });
  }
});

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const tokens = await authService.refreshTokens(refreshToken);

  return res.status(httpStatus.OK).send(tokens);
});
