import { AppDataSource } from '../../config/data-source';
import { User } from '../../entities/User.entity';

export const getProfileService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
    select: ['id', 'name', 'email', 'accountNumber', 'balance', 'createdAt']
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return user;
};
