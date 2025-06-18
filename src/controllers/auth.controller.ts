import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User.entity';
import { generateToken } from '../utils/jwt';
import { sendConfirmationEmail } from '../utils/mailer';

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: 'El usuario ya existe' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const accountNumber = Math.floor(100000000 + Math.random() * 900000000).toString();

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    accountNumber,
  });

  await userRepository.save(user);

  // ✅ Enviar correo de confirmación
  await sendConfirmationEmail(user.email, user.name);

  res.status(201).json({ message: 'Usuario creado correctamente. Revisa tu correo electrónico.' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await userRepository.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: 'Credenciales inválidas' });
    return;
  }

  const token = generateToken({ userId: user.id, email: user.email });

  res.json({ token });
};
