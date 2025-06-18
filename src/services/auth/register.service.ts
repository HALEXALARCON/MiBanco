import { AppDataSource } from '../../config/data-source';
import { User } from '../../entities/User.entity';
import bcrypt from 'bcryptjs';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const registerService = async ({ name, email, password }: RegisterInput) => {
  const userRepository = AppDataSource.getRepository(User);

  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassword,
    accountNumber,
    balance: 0,
  });

  await userRepository.save(newUser);

  return newUser;
};
