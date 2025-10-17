// src/app/cadastro/page.tsx
export const runtime = "nodejs";

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memberSchema } from "@/lib/schemas"; 
import { MemberFormData } from "@/lib/schemas"; 
import { useState } from "react";
import { addMember } from "@/actions/members"; 

export default function CadastroMembro() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  });

  const onSubmit = async (data: MemberFormData) => {
    try {
      setLoading(true);
      const result = await addMember(data);

      if (result.success) {
        alert("Membro cadastrado com sucesso!");
        reset();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar membro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Cadastrar Novo Membro</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Departamento</label>
          <input
            type="text"
            {...register("department")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.department && (
            <p className="text-red-600 text-sm mt-1">{errors.department.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("is_baptized")} />
          <span>Batizado?</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
