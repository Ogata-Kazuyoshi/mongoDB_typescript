"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const crypto_1 = __importDefault(require("crypto"));
const enhash = (str) => {
    const hash = crypto_1.default.createHash('sha256');
    return hash.update(str).digest('hex');
};
const enSalt = () => crypto_1.default.randomBytes(6).toString('hex');
let users = [];
// Passportの設定
//local-signup
passport_1.default.use('local-signup', new passport_local_1.Strategy({ passReqToCallback: true }, async (req, username, password, done) => {
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
    await user_1.default.create(createUser);
    const newUser = await user_1.default.find({
        username: username,
    });
    users.push(newUser[0]);
    return done(null, newUser[0]);
}));
//local-login
passport_1.default.use('local-login', new passport_local_1.Strategy((username, password, done) => {
    const user = users.find(
    //   (u) => u.username === username && u.password === password
    (u) => u.username === username && u.password === enhash(`${u.salt}${password}`));
    if (user) {
        return done(null, user);
    }
    else {
        return done(null, false, { message: 'Incorrect username or password.' });
    }
}));
passport_1.default.serializeUser((user, done) => {
    //   console.log('user serialize : ', user);
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => {
    //cookie情報を入れる際に返却するuser情報。ソルト化されたPWなどは落とすようにする。
    const user = users.find((u) => JSON.stringify(u._id) === JSON.stringify(id));
    const sendUser = {
        _id: user._id,
        username: user.username,
    };
    if (user.vehicle) {
        sendUser.vehicle = user.vehicle;
    }
    done(null, sendUser);
});
const authController = {
    createUser: async (req, res) => {
        const user = await user_1.default.create(req.body);
        res.send(`User : ${user}`);
        try {
        }
        catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const tempUsers = await user_1.default.find();
            users = [...tempUsers];
            next();
        }
        catch (error) {
            console.log(error);
        }
    },
    getOne: async (req, res) => {
        const username = req.params.name;
        try {
            const users = await user_1.default.find({ username: username });
            res.send(users);
        }
        catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        const username = req.user.username;
        console.log('user : ', username);
        try {
            const users = await user_1.default.find({
                username: username,
            });
            const userId = users[0]._id;
            const updateUser = await user_1.default.findByIdAndUpdate(userId, {
                $set: req.body,
            });
            //setの中には変更したいキーだけを入れる。そうすると他は据え置き
            res.send(updateUser);
        }
        catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        const username = req.params.name;
        try {
            await user_1.default.deleteOne({ username: username });
            res.status(204).end();
        }
        catch (error) {
            console.log(error);
        }
    },
    checkAuth: (req, res) => {
        if (req.isAuthenticated()) {
            console.log('req.user : ', req.user);
            const sendUserInfo = {
                // id: (req.user as Express.User)._id,
                username: req.user.username,
            };
            if (req.user.vehicle) {
                sendUserInfo.vehicle = req.user.vehicle;
            }
            res.json({
                authenticated: true,
                user: sendUserInfo,
            });
        }
        else {
            res.json({ authenticated: false });
        }
    },
    signup: (req, res) => {
        res.json({ message: 'Signup successful' });
    },
    login: async (req, res) => {
        res.json({ message: 'Login successful' });
    },
    logout: (req, res) => {
        req.logout(function (err) {
            if (err) {
                // return next(err);
                console.log('err : ', err);
            }
            res.json({ message: 'Logout successful' });
        });
        res;
    },
    passportAuth: passport_1.default.authenticate('local-login'),
    passportSignup: passport_1.default.authenticate('local-signup'),
};
exports.default = authController;
