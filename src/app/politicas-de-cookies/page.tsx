import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | TraduzTudo',
};

export default function CookiesPage() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Política de Cookies</h1>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>Esta Política de Cookies explica como a <strong>TraduzTudo</strong> utiliza cookies e tecnologias semelhantes para reconhecê-lo quando visita nossa plataforma.</p>
          <h2 className="text-xl font-bold text-gray-900">1. O que são cookies?</h2>
          <p>Cookies são pequenos arquivos de texto colocados no seu dispositivo para armazenar dados que podem ser recuperados por um servidor web no domínio que colocou o cookie.</p>
          <h2 className="text-xl font-bold text-gray-900">2. Como usamos cookies</h2>
          <p>Utilizamos cookies essenciais para autenticação de sessão, preferências de modo escuro/claro e cookies analíticos para entender o desempenho de nossas páginas.</p>
          <h2 className="text-xl font-bold text-gray-900">3. Como gerenciar cookies</h2>
          <p>Você pode configurar seu navegador para recusar todos os cookies ou para indicar quando um cookie está sendo enviado. Contato: contato@traduztudo.com.br.</p>
        </div>
      </div>
    </div>
  );
}
