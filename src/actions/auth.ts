// src/actions/auth.ts
'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { loginSchema } from '@/lib/schemas';
import { redirect } from 'next/navigation';

export async function login(data: z.infer<typeof loginSchema>) {
  const validationResult = loginSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: 'Dados inválidos.',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResult.data;
  
  // Criamos um cliente Supabase especial para Server Actions/Route Handlers
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Supabase login error:', error.message);
    return {
      success: false,
      message: 'Credenciais inválidas. Verifique seu e-mail e senha.',
    };
  }

  // Se o login for bem-sucedido, o Supabase Auth Helper cuida do cookie.
  // Agora, vamos redirecionar o usuário para o dashboard.
  redirect('/admin');
}