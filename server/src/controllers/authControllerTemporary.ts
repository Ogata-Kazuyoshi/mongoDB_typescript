import { Request, Response } from 'express';
import User from '../models/user';
import { UserType, UserTypeFromMongoDB } from '../interface/global';

const authController = {
  createUser: async (req: Request<any, any, UserType>, res: Response) => {
    const user = await User.create(req.body);
    res.send(`User : ${user}`);
    try {
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },
  getOne: async (req: Request, res: Response) => {
    const username = req.params.name;
    try {
      const users = await User.find({ username: username });
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req: Request, res: Response) => {
    const username = req.params.name;
    try {
      const users: UserTypeFromMongoDB[] = await User.find({
        username: username,
      });
      const userId = users[0]._id;
      const updateUser = await User.findByIdAndUpdate(userId, {
        $set: req.body,
      });
      //setの中には変更したいキーだけを入れる。そうすると他は据え置き
      res.send(updateUser);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    const username = req.params.name;
    try {
      await User.deleteOne({ username: username });
      res.status(204).end();
    } catch (error) {
      console.log(error);
    }
  },
};

export default authController;
