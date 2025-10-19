// src/lib/schemas.ts
import { z } from 'zod';

// Lista centralizada dos departamentos
export const departments = [
  'Jovens',
  'Louvor',
  'MAIS',
  'Departamento Feminino',
  'Diaconato',
  'Mídia',
  'Departamento de Casais',
  'Departamento Infantil',
  'Pastores/Presbíteros',
  'Ação Social',
];

export const memberSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birth_date: z.string().optional(),
  marital_status: z.string().optional(),
  is_baptized: z.boolean().default(false),
  
  department: z.array(z.string()).optional(), // Tipo array aqui

  baptism_date: z.string().optional(),
})
.refine(data => {
  if (data.is_baptized && (!data.baptism_date || data.baptism_date.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: 'A data de batismo é obrigatória.',
  path: ['baptism_date'], 
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type MemberFormData = z.infer<typeof memberSchema>;

// Tipo Member ajustado para array de department
export type Member = Omit<MemberFormData, 'department'> & {
  id: string;
  created_at: string;
  status: string;
  is_baptized: boolean | null; 
  department: string[] | null; 
};