// src/app/admin/(panel)/membros/page.tsx
import { getAllMembers } from '@/actions/members';
import { MemberActionButtons } from '@/components/ActionButtons';
import Link from 'next/link';

// A página recebe 'searchParams' para ler a query da URL
export default async function PaginaGerenciarMembros({
  searchParams,
}: {
  searchParams?: { q?: string }; 
}) {
  // Pega o termo de busca da URL (ou string vazia)
  const searchTerm = searchParams?.q || ''; 
  
  // Passa o termo de busca para a action
  const members = await getAllMembers(searchTerm); 

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Gerenciamento de Membros
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Visualize, aprove, edite ou remova membros cadastrados.
          </p>
        </div>
        <Link href="/cadastro">
          <span className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 cursor-pointer">
            + Novo Membro
          </span>
        </Link>
      </div>

      {/* Formulário de Busca */}
      <div className="mt-6">
        <form className="flex gap-2">
          <input
            type="text"
            name="q" // Nome do parâmetro na URL
            placeholder="Buscar por nome..."
            defaultValue={searchTerm} // Mantém o valor no campo após a busca
            className="block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 cursor-pointer"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Tabela de Membros */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nome</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Telefone</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Ações</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{member.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          member.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.phone || 'N/A'}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <MemberActionButtons member={member} />
                      </td>
                    </tr>
                  ))}
                  
                  {/* Mensagem se não houver resultados */}
                  {members.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-3 py-4 text-center text-sm text-gray-500 sm:pl-6">
                        Nenhum membro encontrado {searchTerm && `com o nome "${searchTerm}"`}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}