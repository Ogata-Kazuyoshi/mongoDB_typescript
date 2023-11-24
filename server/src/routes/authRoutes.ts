import { Router } from 'express';
import authController from '../controllers/authControllerTemp';
const router = Router();

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
router.post(
  '/signup',
  authController.getAll,
  authController.passportSignup,
  authController.signup
);

//Frontendからの認証チェック
router.get('/checkAuth', authController.checkAuth);

//Frontendからのログイン要求
router.post(
  '/login',
  authController.getAll,
  authController.passportAuth,
  authController.login
);

//Frontendからのログアウト要求
router.get('/logout', authController.logout);

export default router;
