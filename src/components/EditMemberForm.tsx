// // src/components/EditMemberForm.tsx
// "use client";

// import { useForm, SubmitHandler } from "react-hook-form";
// import { MemberFormData } from "@/lib/schemas"; 
// import { updateMember } from "@/actions/members";
// import { useState } from "react";

// type EditMemberFormProps = {
//   member: MemberFormData & { id: string };
// };

// export function EditMemberForm({ member }: EditMemberFormProps) {
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<MemberFormData>({
//     defaultValues: {
//       name: member.name || "",
//       email: member.email || "",
//       department: member.department || "",
//       is_baptized: member.is_baptized || false,
//     },
//   });

//   const onSubmit: SubmitHandler<MemberFormData> = async (data) => {
//     try {
//       setLoading(true);
//       const result = await updateMember(member.id, data);

//       if (result.success) {
//         alert("Membro atualizado com sucesso!");
//       } else {
//         alert(result.message);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Erro ao atualizar o membro.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Nome</label>
//         <input
//           type="text"
//           {...register("name", { required: "O nome é obrigatório" })}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         />
//         {errors.name && (
//           <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">E-mail</label>
//         <input
//           type="email"
//           {...register("email", { required: "O e-mail é obrigatório" })}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         />
//         {errors.email && (
//           <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Departamento</label>
//         <input
//           type="text"
//           {...register("department")}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         />
//       </div>

//       <div className="flex items-center gap-2">
//         <input type="checkbox" {...register("is_baptized")} />
//         <span>Batizado?</span>
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
//       >
//         {loading ? "Salvando..." : "Salvar Alterações"}
//       </button>
//     </form>
//   );
// }


// src/components/EditMemberForm.tsx
'use client';

import { useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema, MemberFormData, Member } from '@/lib/schemas';
import { updateMember } from '@/actions/members';

export function EditMemberForm({ member }: { member: Member }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema), // Zod como fonte da verdade
    defaultValues: {
      name: member.name || '',
      email: member.email || '',
      phone: member.phone || '',
      address: member.address || '',
      birth_date: member.birth_date || '',
      baptism_date: member.baptism_date || '',
      marital_status: member.marital_status || '',
      is_baptized: member.is_baptized || false,
      department: member.department || '',
    },
  });

  const isBaptized = useWatch({ control, name: 'is_baptized' });

  const onSubmit: SubmitHandler<MemberFormData> = async (data) => {
    const result = await updateMember(member.id, data);
    if (result && !result.success) {
      alert(result.message || 'Falha ao atualizar o membro.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Formulário completo idêntico ao de cadastro */}
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
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
        <input id="phone" type="tel" {...register('phone')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
        <input id="address" type="text" {...register('address')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
        <input id="birth_date" type="date" {...register('birth_date')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
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
        <label htmlFor="is_baptized" className="block text-sm font-medium text-gray-900">Membro Batizado</label>
      </div>
      {isBaptized && (
        <div>
          <label htmlFor="baptism_date" className="block text-sm font-medium text-gray-700">Data de Batismo</label>
          <input id="baptism_date" type="date" {...register('baptism_date')} className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
          {errors.baptism_date && <p className="mt-2 text-sm text-red-600">{errors.baptism_date.message}</p>}
        </div>
      )}
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Departamento</label>
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
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}