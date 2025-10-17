// src/app/cadastro/page.tsx
'use client';

import { useForm, useWatch, SubmitHandler } from 'react-hook-form'; 
import { MemberFormData } from '@/lib/schemas';
import { addMember } from '@/actions/members';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PaginaCadastro() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    // REMOVEMOS O ZODRESOLVER DAQUI
    defaultValues: {
      is_baptized: false,
      marital_status: '',
      department: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      birth_date: '',
      baptism_date: '',
    }
  });

  const isBaptized = useWatch({ control, name: 'is_baptized' });

  const onSubmit: SubmitHandler<MemberFormData> = async (data) => {
    const result = await addMember(data);
    if (result.success) {
      router.push('/cadastro/sucesso');
    } else {
      alert(result.message || 'Ocorreu um erro desconhecido.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl">
        <Image src="/images/logo-ieu.jpg" alt="Logo da Igreja" width={70} height={70} className="mx-auto mb-4 rounded-full" />
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">Cadastro de Novo Membro</h1>
        <p className="mb-8 text-center text-gray-600">Preencha o formulário abaixo para iniciar seu cadastro.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
            {/* ADICIONAMOS A VALIDAÇÃO NATIVA ABAIXO */}
            <input id="name" type="text" {...register('name', { required: 'O nome é obrigatório' })} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            {/* ADICIONAMOS A VALIDAÇÃO NATIVA ABAIXO */}
            <input id="email" type="email" {...register('email', { required: 'O e-mail é obrigatório' })} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          {/* O resto dos campos não obrigatórios continua igual */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone (Opcional)</label>
            <input id="phone" type="tel" {...register('phone')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço (Opcional)</label>
            <input id="address" type="text" {...register('address')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
          </div>
          <div>
            <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Data de Nascimento (Opcional)</label>
            <input id="birth_date" type="date" {...register('birth_date')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
          </div>
          <div>
            <label htmlFor="marital_status" className="block text-sm font-medium text-gray-700">Estado Civil</label>
            <select id="marital_status" {...register('marital_status')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="">Selecione...</option>
              <option value="Solteiro(a)">Solteiro(a)</option>
              <option value="Casado(a)">Casado(a)</option>
              <option value="Divorciado(a)">Divorciado(a)</option>
              <option value="Viúvo(a)">Viúvo(a)</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input id="is_baptized" type="checkbox" {...register('is_baptized')} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
            <label htmlFor="is_baptized" className="block text-sm font-medium text-gray-900">Já sou batizado</label>
          </div>
          {isBaptized && (
            <div>
              <label htmlFor="baptism_date" className="block text-sm font-medium text-gray-700">Data de Batismo</label>
              <input id="baptism_date" type="date" {...register('baptism_date')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              {errors.baptism_date && <p className="mt-2 text-sm text-red-600">{errors.baptism_date.message}</p>}
            </div>
          )}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Faz parte de algum departamento?</label>
            <select id="department" {...register('department')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="">Nenhum</option>
              <option value="Jovens">Jovens</option>
              <option value="Louvor">Louvor</option>
              <option value="MAIS">MAIS</option>
              <option value="Departamento Feminino">Departamento Feminino</option>
              <option value="Diaconato">Diaconato</option>
              <option value="Mídia">Mídia</option>
              <option value="Departamento de Casais">Departamento de Casais</option>
              <option value="Departamento Infantil">Departamento Infantil</option>
              <option value="Pastores/Presbíteros">Pastores/Presbíteros</option>
              <option value="Ação Social">Ação Social</option>
            </select>
          </div>
          <div>
            <button type="submit" disabled={isSubmitting} className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400 cursor-pointer">
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}