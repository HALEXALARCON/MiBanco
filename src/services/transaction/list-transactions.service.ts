import { AppDataSource } from '../../config/data-source';
import { Transaction } from '../../entities/Transaction.entity';

export const listTransactionsService = async (userId: string) => {
  const repo = AppDataSource.getRepository(Transaction);

  const sent = await repo.find({
    where: { sender: { id: userId } },
    relations: ['sender', 'receiver'],
    order: { createdAt: 'DESC' }
  });

  const received = await repo.find({
    where: { receiver: { id: userId } },
    relations: ['sender', 'receiver'],
    order: { createdAt: 'DESC' }
  });

  return {
    transfersSent: sent.map(tx => ({
      id: tx.id,
      amount: tx.amount,
      createdAt: tx.createdAt,
      to: {
        name: tx.receiver.name,
        email: tx.receiver.email,
        accountNumber: tx.receiver.accountNumber
      }
    })),
    transfersReceived: received.map(tx => ({
      id: tx.id,
      amount: tx.amount,
      createdAt: tx.createdAt,
      from: {
        name: tx.sender.name,
        email: tx.sender.email,
        accountNumber: tx.sender.accountNumber
      }
    }))
  };
};
