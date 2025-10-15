// src/components/ActionButtons.tsx
'use client';

import { approveMember, deleteMember } from "@/actions/members";
import Link from 'next/link';

interface Member {
  id: string;
  status: string;
}

export function MemberActionButtons({ member }: { member: Member }) {
  // Ação para o botão "Aprovar"
  const approveAction = async () => {
    const result = await approveMember(member.id);

    if (result && !result.success) {
      alert(result.message || 'Ocorreu um erro ao aprovar o membro.');
    }
    // Se for sucesso, a revalidação da página cuidará da atualização da UI.
  };

  // Ação para o botão "Excluir"
  const deleteAction = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este membro? Esta ação não pode ser desfeita.'
    );

    if (confirmed) {
      const result = await deleteMember(member.id);
      if (result && !result.success) {
        alert(result.message || 'Ocorreu um erro ao excluir o membro.');
      }
      // Se for sucesso, a revalidação removerá a linha da tabela.
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Botão de Aprovar */}
      {member.status === 'Pendente' && (
        <form action={approveAction}>
          <button type="submit" className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-green-500">
            Aprovar
          </button>
        </form>
      )}

      {/* Botão/Link de Editar */}
      <Link href={`/admin/membros/${member.id}/editar`}>
        <span className="rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500">
          Editar
        </span>
      </Link>

      {/* Botão de Excluir */}
      <form action={deleteAction}>
        <button type="submit" className="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500">
          Excluir
        </button>
      </form>
    </div>
  );
}