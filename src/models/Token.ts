import mongoose, { Model, Schema } from 'mongoose';
import { IToken } from '../types/interfaces/Token.interface';

export enum TOKEN_TYPE {
  REFRESH_TOKEN = 'refresh-token'
}

const tokenSchema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(TOKEN_TYPE),
    default: TOKEN_TYPE.REFRESH_TOKEN,
  },
  expiredAt: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true,
});


interface ITokenModel extends Model<IToken> {

}

export const Token: ITokenModel = mongoose.model('Token', tokenSchema);
