// src/app/admin/(panel)/membros/[id]/editar/page.tsx
import { getMemberById } from '@/actions/members';
import Link from 'next/link';
import { EditMemberForm } from '@/components/EditMemberForm';

export default async function PaginaEditarMembro({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ No Next.js 15, params é uma Promise — precisamos aguardar a resolução:
  const { id } = await params;

  const member = await getMemberById(id);

  if (!member) {
    return (
      <div>
        <h2 className="text-2xl font-bold">Membro não encontrado</h2>
        <p>O membro que você está tentando editar não existe.</p>

        <Link
          href="/admin/membros"
          className="text-indigo-600 hover:underline mt-4 inline-block"
        >
          Voltar para a lista de membros
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
        Editar Membro:{' '}
        <span className="text-indigo-600">{member.name}</span>
      </h2>

      <div className="mt-8 max-w-2xl">
        <EditMemberForm member={member} />
      </div>
    </div>
  );
}
