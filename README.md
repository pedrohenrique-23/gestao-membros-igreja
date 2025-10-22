# Sistema de Gestão de Membros - Igreja

Um sistema web full-stack para gerenciamento de membros de igreja, construído com Next.js, Supabase e TypeScript.

**Status:** MVP Concluído & Deployado para uso interno | Próximas funcionalidades em desenvolvimento.

---

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido com o objetivo de modernizar e centralizar o gerenciamento de membros de uma comunidade de igreja local. Observando que o controle era realizado manualmente através de formulários Google Forms e planilhas Google Sheets, surgiu a oportunidade de aplicar conhecimentos em desenvolvimento para criar uma solução mais robusta, segura e eficiente para a **Igreja do Evangelho Universal**.

O sistema oferece:
* Um **formulário de cadastro público** intuitivo para novos membros.
* Um **painel administrativo seguro** (protegido por login) para a gestão dos cadastros.
* **Fluxo de Aprovação:** Novos membros entram com status "Pendente" e precisam ser aprovados por um administrador para se tornarem "Ativos".
* **Dashboard** com estatísticas rápidas (total de membros, pendentes).
* **Gerenciamento Completo (CRUD):** Visualização, edição, aprovação e exclusão de membros.
* **Busca** na lista de membros.
* Campos detalhados, incluindo **múltiplos departamentos**.

*(Nota: Este sistema foi deployado em ambiente privado para uso exclusivo da comunidade mencionada).*

---

## ✨ Tecnologias Utilizadas

* **Frontend:**
    * [Next.js](https://nextjs.org/) (React Framework com App Router)
    * [TypeScript](https://www.typescriptlang.org/)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [React Hook Form](https://react-hook-form.com/)
    * [Lucide React](https://lucide.dev/) (Ícones)
* **Backend & Banco de Dados:**
    * [Supabase](https://supabase.io/) (PostgreSQL, Autenticação)
* **Deploy:**
    * [Vercel](https://vercel.com/) (Ambiente Privado)

---

## 📸 Capturas de Tela

* Tela de Cadastro
<img width="1905" height="919" alt="image" src="https://github.com/user-attachments/assets/15485303-7026-4cb0-9def-d9e4df81ace4" />

* Tela de Login
<img width="1920" height="918" alt="image" src="https://github.com/user-attachments/assets/ceaa58ba-3fc9-4fbb-b4da-008d93269d3b" />

* Dashboard
<img width="1920" height="918" alt="image" src="https://github.com/user-attachments/assets/df000111-8c74-48a9-a16e-8437679988fa" />

* Membros
<img width="1920" height="917" alt="image" src="https://github.com/user-attachments/assets/dd3f06ff-3207-42d9-9b47-3772e2c7062e" />

---

## 🚀 Como Rodar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/pedrohenrique-23/gestao-membros-igreja.git
    cd gestao-membros-igreja
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo `.env.local` na raiz do projeto.
    * Adicione as seguintes variáveis, substituindo pelos seus dados de um projeto Supabase (você pode criar um novo para teste):
        ```env
        NEXT_PUBLIC_SUPABASE_URL=SUA_SUPABASE_URL
        NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_SUPABASE_ANON_KEY
        ```
4.  **Rode o projeto em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🔮 Próximos Passos (Planejados)

* [ ] Implementar um modal para visualização rápida dos detalhes do membro na tabela.
* [ ] Adicionar mais filtros à tabela (por status, departamento, etc.).
* [ ] Refinar a interface e a experiência do usuário.

---

*Desenvolvido por Pedro Henrique do Nascimento Silva como parte de um projeto de portfólio e transição de carreira.*
