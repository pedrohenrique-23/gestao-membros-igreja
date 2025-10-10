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

// Isso cria um tipo TypeScript a partir do nosso schema
export type MemberFormData = z.infer<typeof memberSchema>;