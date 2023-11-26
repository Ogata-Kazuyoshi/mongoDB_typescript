import { Router } from 'express';
import authRoutes from './authRoutes';
import userUpdate from './userUpdate';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userUpdate);

export default router;
