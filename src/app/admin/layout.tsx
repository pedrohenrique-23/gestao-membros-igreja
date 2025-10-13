// src/app/admin/layout.tsx
import { logout } from '@/actions/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">Painel Admin</h1>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Sair
          </button>
        </form>
      </header>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}