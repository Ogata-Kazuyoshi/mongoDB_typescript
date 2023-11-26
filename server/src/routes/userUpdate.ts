import { Router } from 'express';
const router = Router();

//DBから全ての情報を取得するエンドポイント
router.get('/', (req, res) => {
  console.log('kokokokok');
  res.send('OKKK');
});

export default router;
