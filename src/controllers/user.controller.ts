// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User.entity';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;

  const user = await AppDataSource.getRepository(User).findOne({
    where: { id: userId },
    select: ['id', 'name', 'email', 'accountNumber'],
  });

  if (!user) {
    res.status(404).json({ message: 'Usuario no encontrado' });
    return;
  }

  res.json(user);
};
