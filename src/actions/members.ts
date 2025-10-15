// src/actions/members.ts
'use server';

import { z } from 'zod';
import { memberSchema, MemberFormData } from '@/lib/schemas';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// --- CREATE ---
export async function addMember(data: MemberFormData) {
  const validationResult = memberSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, message: 'Dados inválidos. Por favor, verifique as informações.' };
  }

  const { error } = await supabase.from('members').insert({
    name: validationResult.data.name,
    email: validationResult.data.email,
    phone: validationResult.data.phone,
    address: validationResult.data.address,
    birth_date: validationResult.data.birth_date || null,
    baptism_date: validationResult.data.baptism_date || null,
  });

  if (error) {
    console.error('Supabase Error:', error.message);
    if (error.code === '23505') {
       return { success: false, message: 'Este e-mail já está cadastrado.' };
    }
    return { success: false, message: 'Ocorreu um erro ao cadastrar. Tente novamente.' };
  }

  return { success: true, message: 'Cadastro realizado com sucesso!' };
}

// --- UPDATE ---
export async function updateMember(memberId: string, data: MemberFormData) {
  const validationResult = memberSchema.safeParse(data);
  if (!validationResult.success) {
    return { success: false, message: 'Dados inválidos.' };
  }

  const { error } = await supabase
    .from('members')
    .update(validationResult.data)
    .eq('id', memberId);

  if (error) {
    console.error('Erro ao atualizar membro:', error.message);
    return { success: false, message: 'Não foi possível atualizar o membro no banco de dados.' };
  }

  revalidatePath('/admin/membros');
  revalidatePath(`/admin/membros/${memberId}/editar`);
  redirect('/admin/membros');
}

export async function approveMember(memberId: string) {
  if (!memberId) {
    return { success: false, message: 'ID do membro não fornecido.' };
  }

  const { error } = await supabase
    .from('members')
    .update({ status: 'Ativo' })
    .eq('id', memberId);

  if (error) {
    console.error('Erro ao aprovar membro:', error.message);
    return { success: false, message: 'Não foi possível aprovar o membro.' };
  }

  revalidatePath('/admin/membros');
  return { success: true };
}

// --- DELETE ---
export async function deleteMember(memberId: string) {
  if (!memberId) {
    return { success: false, message: 'ID do membro não fornecido.' };
  }

  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', memberId);

  if (error) {
    console.error('Erro ao excluir membro:', error.message);
    return { success: false, message: 'Não foi possível excluir o membro.' };
  }

  revalidatePath('/admin/membros');
  return { success: true };
}

// --- READ ---
export async function getMemberStats() {
  const { count: totalCount, error: totalError } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true });

  const { count: pendingCount, error: pendingError } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Pendente');

  if (totalError || pendingError) {
    console.error('Erro ao buscar estatísticas:', totalError || pendingError);
    return { totalCount: 0, pendingCount: 0 };
  }

  return { totalCount: totalCount ?? 0, pendingCount: pendingCount ?? 0 };
}

export async function getAllMembers() {
  const { data: members, error } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar membros:', error.message);
    return [];
  }

  return members || [];
}

export async function getMemberById(memberId: string) {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('id', memberId)
    .single();

  if (error) {
    console.error('Erro ao buscar membro por ID:', error.message);
    return null;
  }

  return data;
}