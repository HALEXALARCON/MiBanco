import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import transactionRoutes from './transaction.routes';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/transactions', transactionRoutes);

export default router;
