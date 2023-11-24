import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoute from './routes/index';

dotenv.config();
const setupServer = () => {
  const app = express();
  app.use(express.json());

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
