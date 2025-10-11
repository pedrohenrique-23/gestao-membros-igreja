// src/app/cadastro/sucesso/page.tsx
import Link from 'next/link';

export default function PaginaSucessoCadastro() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-green-600">
          Cadastro Enviado com Sucesso!
        </h1>
        <p className="mb-6 text-gray-700">
          Obrigado por se registrar. Seus dados foram recebidos e estão aguardando a aprovação de um administrador.
        </p>
        <Link href="/">
          <span className="text-indigo-600 hover:text-indigo-800 hover:underline">
            Voltar para a página inicial
          </span>
        </Link>
      </div>
    </div>
  );
}