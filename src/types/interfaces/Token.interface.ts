import { Document } from 'mongoose';
import { IUser } from './User.interface';
import { TOKEN_TYPE } from '../../models/Token';

export interface IToken extends Document {
  id: string;
  user: string | IUser;
  token: string;
  type: TOKEN_TYPE;
  expiredAt: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
