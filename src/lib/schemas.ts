// src/lib/schemas.ts
import { z } from 'zod';

export const memberSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birth_date: z.string().optional(),
  
  // --- NOVOS CAMPOS ADICIONADOS ---
  marital_status: z.string().optional(),
  is_baptized: z.boolean().default(false), // O padrão é 'não'
  department: z.string().optional(),

  // O campo de data de batismo continua aqui
  baptism_date: z.string().optional(),
})
// --- LÓGICA CONDICIONAL ADICIONADA ---
.refine(data => {
  // Se 'is_baptized' for true, então 'baptism_date' não pode ser vazio.
  if (data.is_baptized && (!data.baptism_date || data.baptism_date.trim() === '')) {
    return false; // Retorna false se a condição não for atendida (inválido)
  }
  return true; // Retorna true se estiver tudo certo (válido)
}, {
  // Mensagem de erro que será exibida
  message: 'A data de batismo é obrigatória.',
  // O campo ao qual a mensagem de erro se aplica
  path: ['baptism_date'], 
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Isso cria um tipo TypeScript a partir do nosso schema
export type MemberFormData = z.infer<typeof memberSchema>;

export type Member = MemberFormData & {
  id: string;
  created_at: string;
  status: string;
};