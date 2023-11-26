"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userShema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    vehicle: {
        type: String,
    },
});
exports.default = mongoose_1.default.model('User', userShema);
//UserがMONGODBのテーブル名になる --> 「users」
//上記をTempとするとテーブル名が変わり新しいテーブルとして保存される --> 「temps」
