'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { loginSchema } from '@/lib/schemas';
import { redirect } from 'next/navigation';

export async function login(data: z.infer<typeof loginSchema>) {
  const validationResult = loginSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, message: 'Dados inválidos.' };
  }

  const { email, password } = validationResult.data;
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: 'Credenciais inválidas. Verifique seu e-mail e senha.',
    };
  }

  redirect('/admin');
}

export async function logout() {
  const supabase = createRouteHandlerClient({ cookies });
  await supabase.auth.signOut();
  redirect('/admin/login');
}