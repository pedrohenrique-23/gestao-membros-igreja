// src/app/admin/(panel)/page.tsx
import { getMemberStats } from '@/actions/members';
import { Users, ClipboardList } from 'lucide-react'; // 1. Importar os ícones

export default async function PaginaAdminDashboard() {
  const { totalCount, pendingCount } = await getMemberStats();

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
        Visão Geral
      </h2>
      <p className="mt-2 text-lg text-gray-600">
        Bem-vindo ao painel administrativo.
      </p>

      {/* Grid para os cards de estatísticas */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* --- INÍCIO DA MELHORIA COM ÍCONES --- */}
        {/* Card de Total de Membros */}
        <div className="flex items-center justify-between overflow-hidden rounded-lg bg-white p-6 shadow">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total de Membros</h3>
            <p className="mt-2 text-4xl font-semibold text-gray-900">
              {totalCount}
            </p>
          </div>
          <Users className="h-10 w-10 text-gray-400" /> {/* 2. Adicionar o ícone */}
        </div>

        {/* Card de Cadastros Pendentes */}
        <div className="flex items-center justify-between overflow-hidden rounded-lg bg-white p-6 shadow">
          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Cadastros Pendentes
            </h3>
            <p className="mt-2 text-4xl font-semibold text-orange-600">
              {pendingCount}
            </p>
          </div>
          <ClipboardList className="h-10 w-10 text-orange-400" /> {/* 3. Adicionar o ícone */}
        </div>
        {/* --- FIM DA MELHORIA COM ÍCONES --- */}
        
      </div>
    </div>
  );
}