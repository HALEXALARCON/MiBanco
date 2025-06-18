import { AppDataSource } from '../../config/data-source';
import { Transaction } from '../../entities/Transaction.entity';

export const getTransactionDetailService = async (transactionId: string) => {
  const transactionRepository = AppDataSource.getRepository(Transaction);

  const transaction = await transactionRepository.findOne({
    where: { id: transactionId },
    relations: ['sender', 'receiver'],
  });

  return transaction;
};
