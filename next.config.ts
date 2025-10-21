// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configurações existentes podem estar aqui (ex: reactStrictMode)
  
  // Adicionamos esta seção para configurar o TypeScript
  typescript: {
    // !! ATENÇÃO !!
    // Permite perigosamente que builds de produção sejam concluídos com sucesso
    // mesmo que seu projeto tenha erros de tipo. Use com cautela.
    // !! ATENÇÃO !!
    ignoreBuildErrors: true, 
  },
};

export default nextConfig;