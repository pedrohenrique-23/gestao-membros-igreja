// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Pega a sessão do usuário com base nos cookies da requisição
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Se não houver sessão E o usuário estiver tentando acessar uma rota protegida...
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    // ...redireciona para a página de login.
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/admin/login';
    return NextResponse.redirect(redirectUrl);
  }

  // Se o usuário tiver sessão e tentar acessar a página de login...
  if (session && req.nextUrl.pathname.startsWith('/admin/login')) {
    // ...redireciona para o dashboard, pois ele já está logado.
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/admin';
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// Configuração para definir em quais rotas o middleware deve rodar
export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};