import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoute from './routes/index';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';

dotenv.config();
const setupServer = () => {
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: 'your-secret-key2',
      resave: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //DB接続
  try {
    mongoose.connect(process.env.MONGODB_URL || 'null');
    console.log('DBと接続中....');
  } catch (error) {
    console.log(error);
  }

  app.use('/api/v1', apiRoute);

  return app;
};

export { setupServer };
