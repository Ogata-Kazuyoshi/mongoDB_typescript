"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllerTemp_1 = __importDefault(require("../controllers/authControllerTemp"));
const router = (0, express_1.Router)();
//新規登録のエンドポイント
// router.post('/register', authController.createUser);
//DBから全ての情報を取得するエンドポイント
// router.get('/', authController.getAll);
//DBから特定の人の情報を取得するエンドポイント
// router.get('/:name', authController.getOne);
//DBから特定の人のデータをUPDATEするエンドポイント
// router.put('/:name', authController.update);
//DBから特定人のデータを削除するエンドポイント
// router.delete('/:name', authController.delete);
//Signupのエンドポイント
router.post('/signup', authControllerTemp_1.default.getAll, authControllerTemp_1.default.passportSignup, authControllerTemp_1.default.signup);
//Frontendからの認証チェック
router.get('/checkAuth', authControllerTemp_1.default.checkAuth);
//Frontendからのログイン要求
router.post('/login', authControllerTemp_1.default.getAll, authControllerTemp_1.default.passportAuth, authControllerTemp_1.default.login);
//Frontendからのログアウト要求
router.get('/logout', authControllerTemp_1.default.logout);
exports.default = router;
