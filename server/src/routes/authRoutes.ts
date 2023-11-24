import { Router } from 'express';
import authController from '../controllers/authController';
const router = Router();

//新規登録のエンドポイント
router.post('/register', authController.createUser);

//DBから全ての情報を取得するエンドポイント
router.get('/', authController.getAll);

//DBから特定の人の情報を取得するエンドポイント
router.get('/:name', authController.getOne);

//DBから特定の人のデータをUPDATEするエンドポイント
router.put('/:name', authController.update);

//DBから特定人のデータを削除するエンドポイント
router.delete('/:name', authController.delete);

export default router;
