// src/actions/members.ts
'use server';

import { memberSchema, MemberFormData, Member } from '@/lib/schemas'; // Importar Member
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers'; 
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
  const dataToInsert = { ...validationResult.data, department: validationResult.data.department || null };
  const { error } = await supabase.from('members').insert(dataToInsert);
  if (error) {
    console.error('Supabase Add Error:', error.message);
    if (error.code === '23505') return { success: false, message: 'Este e-mail já está cadastrado.' };
    return { success: false, message: 'Ocorreu um erro ao cadastrar.' };
  }
  revalidatePath('/admin/membros'); // Adicionado para atualizar a lista após cadastro vindo do admin
  return { success: true, message: 'Cadastro realizado com sucesso!' };
}

// --- UPDATE ---
export async function updateMember(memberId: string, data: MemberFormData) {
  const supabase = await getSupabaseActionClient(); 
  const validationResult = memberSchema.safeParse(data);
  if (!validationResult.success) return { success: false, message: 'Dados inválidos.' };
  const dataToUpdate = { ...validationResult.data, department: validationResult.data.department || null };
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

// *** FUNÇÃO getAllMembers CORRIGIDA E REVISADA ***
export async function getAllMembers(): Promise<Member[]> { // Tipo de retorno explícito
  // USA O CLIENTE IMPORTADO 'supabase'
  const headerStore = headers();
  const search = headerStore.get('x-next-search'); 
  const searchParams = search ? new URLSearchParams(search) : null;
  const searchTerm = searchParams?.get('q') || ''; 

  let query = supabase.from('members').select('*').order('created_at', { ascending: false });
  if (searchTerm && searchTerm.trim() !== '') {
    query = query.ilike('name', `%${searchTerm}%`);
  }
  
  const { data: members, error } = await query;
  if (error) {
    console.error('Erro ao buscar membros:', error.message);
    return [];
  }
  // Garantir que o tipo retornado seja compatível com Member[]
  return (members as Member[]) || []; 
}
// *** FIM DA FUNÇÃO CORRIGIDA ***

export async function getMemberById(memberId: string): Promise<Member | null> { // Tipo de retorno explícito
  // USA O CLIENTE IMPORTADO 'supabase'
  const { data, error } = await supabase.from('members').select('*').eq('id', memberId).single();
  if (error) {
    // É normal não encontrar (error.code === 'PGRST116'), não logar como erro nesses casos
    if (error.code !== 'PGRST116') {
       console.error('Erro ao buscar membro por ID:', error.message);
    }
    return null;
  }
  return data as Member; // Garantir o tipo correto
}