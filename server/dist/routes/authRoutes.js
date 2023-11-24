"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const router = (0, express_1.Router)();
//新規登録のエンドポイント
router.post('/register', authController_1.default.createUser);
//DBから全ての情報を取得するエンドポイント
router.get('/', authController_1.default.getAll);
//DBから特定の人の情報を取得するエンドポイント
router.get('/:name', authController_1.default.getOne);
//DBから特定の人のデータをUPDATEするエンドポイント
router.put('/:name', authController_1.default.update);
//DBから特定人のデータを削除するエンドポイント
router.delete('/:name', authController_1.default.delete);
exports.default = router;
