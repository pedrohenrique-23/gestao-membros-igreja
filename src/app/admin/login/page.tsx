// src/app/admin/login/page.tsx
'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/schemas';
import { login } from '@/actions/auth';
import { useState } from 'react';

export default function PaginaLoginAdmin() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);
    const result = await login(data);
    if (result && !result.success) {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        
        <Image
          src="/images/logo-ieu.jpg"
          alt="Logo da Igreja"
          width={80}
          height={80}
          className="mx-auto mb-6 rounded-full"
        />

        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Acesso ao Painel
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input id="email" type="email" {...register('email')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            {errors.email && (<p className="mt-2 text-sm text-red-600">{errors.email.message}</p>)}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input id="password" type="password" {...register('password')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            {errors.password && (<p className="mt-2 text-sm text-red-600">{errors.password.message}</p>)}
          </div>

          {errorMessage && (<div className="rounded-md border border-red-400 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div>)}

          <div>
            <button type="submit" disabled={isSubmitting} className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400 cursor-pointer">
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}