// src/lib/schemas.ts
import { z } from 'zod';

export const memberSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  phone: z.string().optional(),
  address: z.string().optional(),
  // As datas são strings no formulário, mas serão convertidas.
  // Opcional significa que podem ser strings vazias.
  birth_date: z.string().optional(),
  baptism_date: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Isso cria um tipo TypeScript a partir do nosso schema
export type MemberFormData = z.infer<typeof memberSchema>;