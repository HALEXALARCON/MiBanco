import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User.entity';

export async function generateAccountNumber(): Promise<string> {
  let account: string;
  do {
    account = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  } while (
    await AppDataSource.getRepository(User).findOne({ where: { accountNumber: account } })
  );
  return account;
}