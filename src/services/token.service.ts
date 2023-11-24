import jwt from 'jsonwebtoken';
import { CONFIG } from '../constants/config';
import { IUser } from '../types/interfaces';
import { TOKEN_TYPE, Token, User } from '../models';
import moment from 'moment';
import { ApiError } from '../utils/ApiError';

const generateToken = (
  payload: any,
  expires = CONFIG.JWT_REFRESH_EXPIRATION_DAYS * 3600 * 24,
  secret = CONFIG.JWT_SECRET
) => {
  return jwt.sign(payload, secret, { expiresIn: expires });
};

export const generateAuthTokens = async (user: IUser) => {
  const tokenInfo = {
    id: user.id,
    email: user.email,
  };

  const accessToken = generateToken(tokenInfo, CONFIG.JWT_ACCESS_EXPIRATION_MINUTES * 60);
  const refreshToken = generateToken(tokenInfo, CONFIG.JWT_REFRESH_EXPIRATION_DAYS * 3600 * 24);

  const expiredAt = moment().add(1, 'months').toDate();

  await Token.create({
    token: refreshToken,
    type: TOKEN_TYPE.REFRESH_TOKEN,
    user: user.id, 
    expiredAt,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const validateToken = async (token: string, type: TOKEN_TYPE, tokenName = 'Token'): Promise<IUser> => {
  const tokenDoc = await Token.findOne({ type: TOKEN_TYPE.REFRESH_TOKEN, token });
  if (!tokenDoc) {
    throw new ApiError(400, `Invalid ${tokenName}`);
  }

  if (new Date(tokenDoc.expiredAt).getTime() < new Date().getTime()) {
    throw new ApiError(400, `${tokenName} is expired`);
  }

  const user = await User.findOne({  id: tokenDoc.user });
  if (!user) {
    throw new ApiError(400, 'User Not Found');
  }

  await tokenDoc.remove();

  return user;
};
