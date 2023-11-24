import * as http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import httpContext from 'express-http-context';
import morgan from 'morgan';

import passport from 'passport';
import { jwtStrategy } from './config/passport';

import { errorHandler } from './middlewares/errorHandler';
import router from './routes';

const helmet = require('helmet');
const app = express();

app.disable('etag');
app.disable('x-powered-by');

app.use(helmet());

app.use(cors());

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static(`${__dirname}/public`));

app.use(httpContext.middleware);
app.use((req, res, next) => {
  httpContext.set('request', req);
  next();
});

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/api', router);

app.use('*', (req, res) => {
  console.log('ROUTE NOT FOUND');
  res.sendStatus(400);
});

app.use(errorHandler);

const server = http.createServer(app);

export default server;
