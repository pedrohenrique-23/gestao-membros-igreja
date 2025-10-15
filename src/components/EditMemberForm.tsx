// src/components/EditMemberForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema, MemberFormData } from '@/lib/schemas';
import { updateMember } from '@/actions/members';

export function EditMemberForm({ member }: { member: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: member.name,
      email: member.email,
      phone: member.phone || '',
      address: member.address || '',
      birth_date: member.birth_date || '',
      baptism_date: member.baptism_date || '',
    },
  });

  const onSubmit = async (data: MemberFormData) => {
    const result = await updateMember(member.id, data);

    if (result && !result.success) {
      alert(result.message || 'Falha ao atualizar o membro.');
    }
    // Se não houver resultado, significa que o redirect da action foi bem-sucedido.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input id="name" type="text" {...register('name')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input id="email" type="email" {...register('email')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone (Opcional)</label>
            <input id="phone" type="tel" {...register('phone')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço (Opcional)</label>
            <input id="address" type="text" {...register('address')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
                <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Data de Nascimento (Opcional)</label>
                <input id="birth_date" type="date" {...register('birth_date')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="baptism_date" className="block text-sm font-medium text-gray-700">Data de Batismo (Opcional)</label>
                <input id="baptism_date" type="date" {...register('baptism_date')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
        </div>
      <div>
        <button type="submit" disabled={isSubmitting} className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400">
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}