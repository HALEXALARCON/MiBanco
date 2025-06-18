import { Router } from 'express';
import { body } from 'express-validator';
import {
  transfer,
  getTransactions,
  getTransactionDetail
} from '../controllers/transaction.controller';
import { protect } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';

const router = Router();

// Transferencia entre usuarios
router.post(
  '/',
  protect,
  body('recipientAccountNumber')
    .notEmpty()
    .withMessage('El número de cuenta es requerido'),
  body('amount')
    .isNumeric()
    .withMessage('El monto debe ser numérico'),
  validateRequest,
  transfer
);

// Historial de transacciones del usuario autenticado
router.get('/', protect, getTransactions);

// Detalle de una transacción específica
router.get('/detalle/:transactionId', protect, getTransactionDetail);

export default router;
