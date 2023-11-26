import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import {
  BrowserSendType,
  UserType,
  UserTypeFromMongoDB,
} from '../interface/global';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ObjectId } from 'mongoose';
import crypto from 'crypto';

declare namespace Express {
  interface User {
    username: string;
    password: string;
    _id: ObjectId; // あなたの実際の型に合わせて変更
    salt: string;
    vehicle?: string;
  }
}

const enhash = (str: string): string => {
  const hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
};
const enSalt = () => crypto.randomBytes(6).toString('hex');

let users: UserTypeFromMongoDB[] = [];
// Passportの設定
//local-signup
passport.use(
  'local-signup',
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      // 新規登録時にはユーザーの存在チェックなどを行う
      const existingUser = users.find((u) => u.username === username);
      if (existingUser) {
        return done(null, false, { message: 'Username already exists.' });
      }

      const salt = enSalt();
      const hashed = enhash(`${salt}${password}`);
      const createUser = {
        username: username,
        salt: salt,
        password: hashed,
      };

      await User.create(createUser);
      const newUser: UserTypeFromMongoDB[] = await User.find({
        username: username,
      });
      users.push(newUser[0]);
      return done(null, newUser[0]);
    }
  )
);

//local-login
passport.use(
  'local-login',
  new LocalStrategy((username, password, done) => {
    const user = users.find(
      //   (u) => u.username === username && u.password === password
      (u) =>
        u.username === username && u.password === enhash(`${u.salt}${password}`)
    );
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
  })
);

passport.serializeUser((user, done) => {
  //   console.log('user serialize : ', user);
  done(null, (user as Express.User)._id);
});

passport.deserializeUser((id, done) => {
  //cookie情報を入れる際に返却するuser情報。ソルト化されたPWなどは落とすようにする。
  const user = users.find((u) => JSON.stringify(u._id) === JSON.stringify(id));
  const sendUser: BrowserSendType = {
    _id: user!._id,
    username: user!.username,
  };
  if (user!.vehicle) {
    sendUser.vehicle = user!.vehicle;
  }
  done(null, sendUser);
});

const authController = {
  createUser: async (req: Request<any, any, UserType>, res: Response) => {
    const user = await User.create(req.body);
    res.send(`User : ${user}`);
    try {
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tempUsers: UserTypeFromMongoDB[] = await User.find();
      users = [...tempUsers];
      next();
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
    const username = (req.user as Express.User).username;
    console.log('user : ', username);
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
  checkAuth: (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      console.log('req.user : ', req.user);
      const sendUserInfo: BrowserSendType = {
        // id: (req.user as Express.User)._id,
        username: (req.user as Express.User).username,
      };
      if ((req.user as Express.User).vehicle) {
        sendUserInfo.vehicle = (req.user as Express.User).vehicle;
      }
      res.json({
        authenticated: true,
        user: sendUserInfo,
      });
    } else {
      res.json({ authenticated: false });
    }
  },
  signup: (req: Request, res: Response) => {
    res.json({ message: 'Signup successful' });
  },
  login: async (req: Request, res: Response) => {
    res.json({ message: 'Login successful' });
  },
  logout: (req: Request, res: Response) => {
    req.logout(function (err) {
      if (err) {
        // return next(err);
        console.log('err : ', err);
      }
      res.json({ message: 'Logout successful' });
    });
    res;
  },
  passportAuth: passport.authenticate('local-login'),
  passportSignup: passport.authenticate('local-signup'),
};

export default authController;
