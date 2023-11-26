import { ObjectId } from 'mongoose';

export interface UserType {
  username: string;
  salt: string;
  password: string;
  vehicle?: string;
}

interface MongoDB {
  _id: ObjectId;
}

export type UserTypeFromMongoDB = UserType & MongoDB;

export interface BrowserSendType {
  _id?: ObjectId;
  username: string;
  vehicle?: string;
}
