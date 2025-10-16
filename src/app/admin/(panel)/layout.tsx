// src/app/admin/layout.tsx
import Link from 'next/link';
import Image from 'next/image'; // 1. Importamos o componente Image
import { logout } from '@/actions/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = async () => {
    'use server';
    await logout();
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
        <div className="flex items-center gap-8">
          
          {/* 2. Substituímos o <h1> pelo logo dentro de um Link */}
          <Link href="/admin">
            <Image
              src="/images/logo-ieu.jpg"
              alt="Logo da Igreja - Painel"
              width={40} // Usamos um tamanho menor para o cabeçalho
              height={40}
              className="rounded-full" // Opcional: para deixar o logo redondo
            />
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link href="/admin">
              <span className="text-sm font-medium text-gray-600 hover:text-indigo-600">
                Dashboard
              </span>
            </Link>
            <Link href="/admin/membros">
              <span className="text-sm font-medium text-gray-600 hover:text-indigo-600">
                Membros
              </span>
            </Link>
          </nav>
        </div>
        <form action={handleLogout}>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 cursor-pointer"
          >
            Sair
          </button>
        </form>
      </header>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}