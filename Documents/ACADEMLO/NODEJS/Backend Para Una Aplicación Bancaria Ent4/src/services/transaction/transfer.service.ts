import { AppDataSource } from '../../config/data-source';
import { User } from '../../entities/User.entity';
import { Transaction } from '../../entities/Transaction.entity';

interface TransferInput {
  senderId: string;
  recipientId: string;
  amount: number;
}

export const transferService = async ({ senderId, recipientId, amount }: TransferInput) => {
  const userRepository = AppDataSource.getRepository(User);
  const transactionRepository = AppDataSource.getRepository(Transaction);

  const sender = await userRepository.findOne({ where: { id: senderId.toString() } });
  const recipient = await userRepository.findOne({ where: { id: recipientId.toString() } });

  if (!sender || !recipient) {
    throw new Error('Usuario emisor o receptor no encontrado');
  }

  if (sender.balance < amount) {
    throw new Error('Fondos insuficientes');
  }

  sender.balance -= amount;
  recipient.balance += amount;

  const transaction = transactionRepository.create({
    amount,
    sender,
    receiver: recipient,
  });

  await userRepository.save([sender, recipient]);
  await transactionRepository.save(transaction);

  return transaction;
};
