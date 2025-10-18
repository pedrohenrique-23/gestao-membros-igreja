// src/actions/members.ts
'use server';

import { memberSchema, MemberFormData } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Cliente para funções de escrita (actions)
async function getSupabaseActionClient() {
  return createRouteHandlerClient({ cookies });
}

// Cliente para funções de leitura (chamadas em Server Components)
async function getSupabaseReadClient() {
  return createRouteHandlerClient({ cookies });
}

// --- CREATE ---
export async function addMember(data: MemberFormData) {
  const supabase = await getSupabaseActionClient();
  const validationResult = memberSchema.safeParse(data);
  if (!validationResult.success) return { success: false, message: 'Dados inválidos.' };
  const { error } = await supabase.from('members').insert(validationResult.data);
  if (error) {
    console.error('Supabase Add Error:', error.message);
    if (error.code === '23505') return { success: false, message: 'Este e-mail já está cadastrado.' };
    return { success: false, message: 'Ocorreu um erro ao cadastrar.' };
  }
  return { success: true, message: 'Cadastro realizado com sucesso!' };
}

// --- UPDATE ---
export async function updateMember(memberId: string, data: MemberFormData) {
  const supabase = await getSupabaseActionClient();
  const validationResult = memberSchema.safeParse(data);
  if (!validationResult.success) return { success: false, message: 'Dados inválidos.' };
  const { error } = await supabase.from('members').update(validationResult.data).eq('id', memberId);
  if (error) {
    console.error('Supabase Update Error:', error.message);
    return { success: false, message: 'Não foi possível atualizar o membro.' };
  }
  revalidatePath('/admin/membros');
  revalidatePath(`/admin/membros/${memberId}/editar`);
  redirect('/admin/membros');
}

export async function approveMember(memberId: string) {
  const supabase = await getSupabaseActionClient();
  if (!memberId) return { success: false, message: 'ID do membro não fornecido.' };
  const { error } = await supabase.from('members').update({ status: 'Ativo' }).eq('id', memberId);
  if (error) {
    console.error('Supabase Approve Error:', error.message);
    return { success: false, message: 'Não foi possível aprovar o membro.' };
  }
  revalidatePath('/admin/membros');
  return { success: true };
}

// --- DELETE ---
export async function deleteMember(memberId: string) {
  const supabase = await getSupabaseActionClient();
  if (!memberId) return { success: false, message: 'ID do membro não fornecido.' };
  const { error } = await supabase.from('members').delete().eq('id', memberId);
  if (error) {
    console.error('Supabase Delete Error:', error.message);
    return { success: false, message: 'Não foi possível excluir o membro.' };
  }
  revalidatePath('/admin/membros');
  return { success: true };
}

// --- READ ---
export async function getMemberStats() {
  const supabase = await getSupabaseReadClient();
  const { count: totalCount, error: totalError } = await supabase.from('members').select('*', { count: 'exact', head: true });
  const { count: pendingCount, error: pendingError } = await supabase.from('members').select('*', { count: 'exact', head: true }).eq('status', 'Pendente');
  if (totalError || pendingError) {
    console.error('Erro ao buscar estatísticas:', totalError || pendingError);
    return { totalCount: 0, pendingCount: 0 };
  }
  return { totalCount: totalCount ?? 0, pendingCount: pendingCount ?? 0 };
}

// *** FUNÇÃO MODIFICADA PARA BUSCA ***
export async function getAllMembers(searchTerm?: string) {
  const supabase = await getSupabaseReadClient();

  let query = supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });

  if (searchTerm && searchTerm.trim() !== '') {
    // Adiciona o filtro ILIKE para buscar nomes que contenham o termo
    query = query.ilike('name', `%${searchTerm}%`);
  }

  const { data: members, error } = await query;

  if (error) {
    console.error('Erro ao buscar membros:', error.message);
    return [];
  }

  return members || [];
}
// *** FIM DA FUNÇÃO MODIFICADA ***

export async function getMemberById(memberId: string) {
  const supabase = await getSupabaseReadClient();
  const { data, error } = await supabase.from('members').select('*').eq('id', memberId).single();
  if (error) {
    console.error('Erro ao buscar membro por ID:', error.message);
    return null;
  }
  return data;
}