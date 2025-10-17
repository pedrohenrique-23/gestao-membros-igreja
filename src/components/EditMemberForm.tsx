// src/components/EditMemberForm.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { MemberFormData } from "@/lib/schemas"; 
import { updateMember } from "@/actions/members";
import { useState } from "react";

type EditMemberFormProps = {
  member: MemberFormData & { id: string };
};

export function EditMemberForm({ member }: EditMemberFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberFormData>({
    defaultValues: {
      name: member.name || "",
      email: member.email || "",
      department: member.department || "",
      is_baptized: member.is_baptized || false,
    },
  });

  const onSubmit: SubmitHandler<MemberFormData> = async (data) => {
    try {
      setLoading(true);
      const result = await updateMember(member.id, data);

      if (result.success) {
        alert("Membro atualizado com sucesso!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar o membro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          {...register("name", { required: "O nome é obrigatório" })}
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
          {...register("email", { required: "O e-mail é obrigatório" })}
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
        {loading ? "Salvando..." : "Salvar Alterações"}
      </button>
    </form>
  );
}
