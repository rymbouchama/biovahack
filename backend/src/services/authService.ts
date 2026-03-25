import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { User } from '../types';

export interface AuthTokens {
  accessToken: string;
}

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<{ user: User; tokens: AuthTokens }> => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }
  });

  const tokens = signTokens(user.id);
  return { user, tokens };
};

export const loginUser = async (data: { email: string; password: string }): Promise<{ user: User; tokens: AuthTokens }> => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const tokens = signTokens(user.id);
  return { user, tokens };
};

const signTokens = (userId: number): AuthTokens => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');

  const accessToken = jwt.sign({ userId }, secret, {
    expiresIn: '1d'
  });

  return { accessToken };
};
