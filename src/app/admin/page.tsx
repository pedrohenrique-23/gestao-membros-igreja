// src/app/admin/page.tsx
import { getMemberStats } from '@/actions/members';

// Tornamos o componente da página assíncrono para usar await
export default async function PaginaAdminDashboard() {
  // Buscamos os dados diretamente no servidor antes de renderizar a página
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
        {/* Card de Total de Membros */}
        <div className="overflow-hidden rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total de Membros</h3>
          <p className="mt-2 text-4xl font-semibold text-gray-900">
            {totalCount}
          </p>
        </div>

        {/* Card de Cadastros Pendentes */}
        <div className="overflow-hidden rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Cadastros Pendentes
          </h3>
          <p className="mt-2 text-4xl font-semibold text-orange-600">
            {pendingCount}
          </p>
        </div>
      </div>
    </div>
  );
}