// src/app/admin/page.tsx

export default function PaginaAdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Bem-vindo ao Dashboard!</h1>
      <p className="mt-4 text-lg text-gray-600">
        Esta é uma área protegida. Somente administradores logados podem ver
        isso.
      </p>
      {/* Aqui construiremos o conteúdo do dashboard na próxima fase */}
    </div>
  );
}