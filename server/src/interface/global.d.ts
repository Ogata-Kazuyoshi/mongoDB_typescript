import { ObjectId } from 'mongoose';

export interface UserType {
  username: string;
  password: string;
}

interface MongoDB {
  _id: ObjectId;
}

export type UserTypeFromMongoDB = UserType & MongoDB;
