// src/actions/members.ts
'use server'; // Diretiva que define este arquivo como um módulo de Server Actions

import { z } from 'zod';
import { memberSchema } from '@/lib/schemas';
import { supabase } from '@/lib/supabase';

// Usamos z.infer para obter o tipo TypeScript do nosso schema
type MemberData = z.infer<typeof memberSchema>;

export async function addMember(data: MemberData) {
  // 1. Validar os dados no servidor novamente (Princípio da Dupla Validação)
  const validationResult = memberSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: 'Dados inválidos. Por favor, verifique as informações.',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 2. Inserir os dados no Supabase
  const { error } = await supabase.from('members').insert({
    // Os campos aqui devem corresponder exatamente aos nomes das colunas na tabela
    name: validationResult.data.name,
    email: validationResult.data.email,
    phone: validationResult.data.phone,
    address: validationResult.data.address,
    birth_date: validationResult.data.birth_date || null, // Se a data for string vazia, salva como nulo
    baptism_date: validationResult.data.baptism_date || null,
    // O status "Pendente" é definido por padrão no banco de dados, então não precisamos enviar.
  });

  // 3. Lidar com possíveis erros do banco de dados
  if (error) {
    console.error('Supabase Error:', error.message);
    // Erro comum: email duplicado. Código de erro do Postgres para violação de unicidade é '23505'
    if (error.code === '23505') {
       return { success: false, message: 'Este e-mail já está cadastrado.' };
    }
    return { success: false, message: 'Ocorreu um erro ao cadastrar. Tente novamente.' };
  }

  // 4. Retornar sucesso
  return { success: true, message: 'Cadastro realizado com sucesso!' };
}