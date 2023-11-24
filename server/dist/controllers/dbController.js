"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const dbController = {
    createUser: async (req, res) => {
        const user = await user_1.default.create(req.body);
        res.send(`User : ${user}`);
        try {
        }
        catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await user_1.default.find();
            res.send(users);
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
        const username = req.params.name;
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
};
exports.default = dbController;
