// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// As variáveis de ambiente são lidas diretamente no servidor
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// O '!' no final diz ao TypeScript: "Confie em mim, esta variável de ambiente existe."
// É seguro fazer isso aqui porque o Next.js falharia ao iniciar se elas não estivessem no .env.local
// ou nas configurações da Vercel.

export const supabase = createClient(supabaseUrl, supabaseKey);