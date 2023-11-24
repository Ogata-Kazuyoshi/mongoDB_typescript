import { Router } from 'express';
import authRoutes from './authRoutes';

const router = Router();

router.use('/db', authRoutes);

export default router;
