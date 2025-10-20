// src/actions/members.ts
'use server';

import { memberSchema, MemberFormData, Member } from '@/lib/schemas'; // Importar Member
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'; // Não precisamos mais de 'headers' aqui
import { supabase } from '@/lib/supabase'; // Importar o cliente de leitura

// Cliente para FUNÇÕES DE ESCRITA (continua igual)
async function getSupabaseActionClient() {
  return createRouteHandlerClient({ cookies });
} 

// --- CREATE ---
export async function addMember(data: MemberFormData) {
  const supabase = await getSupabaseActionClient();
  const validationResult = memberSchema.safeParse(data);
  if (!validationResult.success) return { success: false, message: 'Dados inválidos.' };
  const dataToInsert = { ...validationResult.data, department: data.department || null };
  const { error } = await supabase.from('members').insert(dataToInsert);
  if (error) {
    console.error('Supabase Add Error:', error.message);
    if (error.code === '23505') return { success: false, message: 'Este e-mail já está cadastrado.' };
    return { success: false, message: 'Ocorreu um erro ao cadastrar.' };
  }
  revalidatePath('/admin/membros');
  return { success: true, message: 'Cadastro realizado com sucesso!' };
}

// --- UPDATE ---
export async function updateMember(memberId: string, data: MemberFormData) {
  const supabase = await getSupabaseActionClient();
  const validationResult = memberSchema.safeParse(data);
  if (!validationResult.success) return { success: false, message: 'Dados inválidos.' };
  const dataToUpdate = { ...validationResult.data, department: data.department || null };
  const { error } = await supabase.from('members').update(dataToUpdate).eq('id', memberId);
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
  // USA O CLIENTE IMPORTADO 'supabase'
  const { count: totalCount, error: totalError } = await supabase.from('members').select('*', { count: 'exact', head: true });
  const { count: pendingCount, error: pendingError } = await supabase.from('members').select('*', { count: 'exact', head: true }).eq('status', 'Pendente');
  if (totalError || pendingError) {
    console.error('Erro ao buscar estatísticas:', totalError || pendingError);
    return { totalCount: 0, pendingCount: 0 };
  }
  return { totalCount: totalCount ?? 0, pendingCount: pendingCount ?? 0 };
}

// *** FUNÇÃO getAllMembers CORRIGIDA E FINAL ***
export async function getAllMembers(searchTerm?: string): Promise<Member[]> { // VOLTA A RECEBER searchTerm
  // USA O CLIENTE IMPORTADO 'supabase'

  // REMOVEMOS A LEITURA DE HEADERS DAQUI

  let query = supabase.from('members').select('*').order('created_at', { ascending: false });
  // Usa o searchTerm recebido como parâmetro
  if (searchTerm && searchTerm.trim() !== '') {
    query = query.ilike('name', `%${searchTerm}%`);
  }

  const { data: members, error } = await query;
  if (error) {
    console.error('Erro ao buscar membros:', error.message);
    return [];
  }
  return (members as Member[]) || [];
}
// *** FIM DA FUNÇÃO CORRIGIDA ***

export async function getMemberById(memberId: string): Promise<Member | null> {
  // USA O CLIENTE IMPORTADO 'supabase'
  const { data, error } = await supabase.from('members').select('*').eq('id', memberId).single();
  if (error) {
    if (error.code !== 'PGRST116') { // Não logar erro se for "not found"
       console.error('Erro ao buscar membro por ID:', error.message);
    }
    return null;
  }
  return data as Member;
}