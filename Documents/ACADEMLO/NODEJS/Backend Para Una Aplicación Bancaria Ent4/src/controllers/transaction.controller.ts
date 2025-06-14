import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Transaction } from '../entities/Transaction.entity';
import { User } from '../entities/User.entity';

const transactionRepository = AppDataSource.getRepository(Transaction);
const userRepository = AppDataSource.getRepository(User);

// TRANSFERENCIA DE DINERO
export const transfer = async (req: Request, res: Response): Promise<void> => {
  const { amount, recipientAccountNumber } = req.body;
  const user = (req as any).user;

  if (!user || !user.id) {
    res.status(401).json({ message: 'Usuario no autenticado' });
    return;
  }

  if (!amount || !recipientAccountNumber) {
    res.status(400).json({ message: 'Faltan datos requeridos' });
    return;
  }

  const sender = await userRepository.findOne({ where: { id: user.id } });
  const receiver = await userRepository.findOne({
    where: { accountNumber: recipientAccountNumber },
  });

  if (!sender || !receiver) {
    res.status(404).json({ message: 'Usuario no encontrado' });
    return;
  }

  if (sender.id === receiver.id) {
    res.status(400).json({ message: 'No puedes transferirte a ti mismo' });
    return;
  }

  if (Number(sender.balance) < Number(amount)) {
    res.status(400).json({ message: 'Fondos insuficientes' });
    return;
  }

  sender.balance = Number(sender.balance) - Number(amount);
  receiver.balance = Number(receiver.balance) + Number(amount);

  await userRepository.save(sender);
  await userRepository.save(receiver);

  const transaction = transactionRepository.create({
    amount,
    sender,
    receiver,
  });

  await transactionRepository.save(transaction);

  res.status(201).json({ message: 'Transferencia realizada correctamente' });
};

// HISTORIAL DE TRANSACCIONES
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;

  const transactions = await transactionRepository.find({
    where: [
      { sender: { id: user.id } },
      { receiver: { id: user.id } },
    ],
    relations: ['sender', 'receiver'],
    order: { createdAt: 'DESC' },
  });

  const formatted = transactions.map((tx) => ({
    id: tx.id,
    amount: tx.amount,
    date: tx.createdAt,
    sender: {
      id: tx.sender.id,
      name: tx.sender.name,
      email: tx.sender.email,
    },
    receiver: {
      id: tx.receiver.id,
      name: tx.receiver.name,
      email: tx.receiver.email,
    },
  }));

  res.json(formatted);
};

// DETALLE DE UNA TRANSACCIÓN POR ID
export const getTransactionDetail = async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;
  const { transactionId } = req.params;

  const transaction = await transactionRepository.findOne({
    where: { id: transactionId },
    relations: ['sender', 'receiver'],
  });

  if (!transaction) {
    res.status(404).json({ message: 'Transacción no encontrada' });
    return;
  }

  // Validar que el usuario esté involucrado
  if (transaction.sender.id !== user.id && transaction.receiver.id !== user.id) {
    res.status(403).json({ message: 'No tienes acceso a esta transacción' });
    return;
  }

  res.json({
    id: transaction.id,
    amount: transaction.amount,
    date: transaction.createdAt,
    sender: {
      id: transaction.sender.id,
      name: transaction.sender.name,
      email: transaction.sender.email,
      accountNumber: transaction.sender.accountNumber,
    },
    receiver: {
      id: transaction.receiver.id,
      name: transaction.receiver.name,
      email: transaction.receiver.email,
      accountNumber: transaction.receiver.accountNumber,
    },
  });
};
