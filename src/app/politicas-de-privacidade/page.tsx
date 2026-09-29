import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | eTraduções',
};

export default function PrivacidadePage() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Política de Privacidade</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <p className="text-sm text-gray-400">Última atualização: Janeiro de 2024</p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Informações que coletamos</h2>
            <p>
              A eTraduções (AITRADBRASIL LTDA, CNPJ 14.617.747/0001-06) coleta informações fornecidas
              diretamente por você, como nome completo, e-mail, telefone e documentos enviados para
              orçamento e tradução.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Como usamos suas informações</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Para fornecer os serviços de tradução solicitados</li>
              <li>Para enviar orçamentos e comunicados sobre seus pedidos</li>
              <li>Para melhorar nossos serviços e plataforma</li>
              <li>Para cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Sigilo dos documentos</h2>
            <p>
              Todos os documentos enviados são tratados com total confidencialidade. Não compartilhamos
              seus documentos com terceiros, exceto com os tradutores responsáveis pela sua tradução,
              que assinam acordos de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Seus direitos (LGPD)</h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a: acessar,
              corrigir, excluir e portar seus dados pessoais. Para exercer esses direitos, entre em
              contato: contato@etraducoes.com.br
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Contato</h2>
            <p>
              Para dúvidas sobre privacidade: <a href="mailto:contato@etraducoes.com.br" className="text-[#2e7ec6] hover:underline">contato@etraducoes.com.br</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
