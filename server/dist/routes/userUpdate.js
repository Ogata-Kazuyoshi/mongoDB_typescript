"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//DBから全ての情報を取得するエンドポイント
router.get('/', (req, res) => {
    console.log('kokokokok');
    res.send('OKKK');
});
exports.default = router;
