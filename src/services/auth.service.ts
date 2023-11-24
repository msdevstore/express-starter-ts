import httpStatus from 'http-status';
import { TOKEN_TYPE, User } from '../models';
import { ApiError } from '../utils/ApiError';
import * as tokenService from './token.service';

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const match = await user.isPasswordMatch(password);
  if (!match) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is not matched');
  }

  return user;
};

export const refreshTokens = async (token: string) => {
  const user = await tokenService.validateToken(token, TOKEN_TYPE.REFRESH_TOKEN);

  return tokenService.generateAuthTokens(user);
};
