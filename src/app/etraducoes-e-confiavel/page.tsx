import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, Star, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'A TraduzTudo é Confiável? | Nossas Referências',
  description: 'Conheça nossas garantias, avaliações 5 estrelas no Google, dados da empresa e segurança no manuseio de documentos oficiais.',
};

export default function ConfiavelPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Segurança & Credibilidade
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">A TraduzTudo é Confiável?</h1>
          <p className="text-lg text-gray-600">
            Sim! Somos uma empresa registrada, com tradição no mercado e avaliação máxima de nossos clientes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
            <ShieldCheck className="text-green-500 shrink-0 mt-1" size={28} />
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Empresa Registrada e Regular</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Operamos sob o CNPJ 14.617.747/0001-06, com emissão de nota fiscal para 100% dos serviços prestados a pessoas físicas e jurídicas.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
            <Award className="text-[#2e7ec6] shrink-0 mt-1" size={28} />
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Tradutores Juramentados Oficiais</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Todas as nossas traduções juramentadas são elaboradas por tradutores concursados e matriculados nas Juntas Comerciais do Brasil.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
            <Star className="text-yellow-400 shrink-0 mt-1" size={28} />
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Avaliações 5 Estrelas no Google</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Centenas de clientes atendidos com nota máxima no Google Avaliações comprovam nosso compromisso com prazo e precisão.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
            <CheckCircle className="text-[#2e7ec6] shrink-0 mt-1" size={28} />
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Proteção de Dados & Sigilo LGPD</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Seus dados e arquivos são mantidos em servidores criptografados e destruídos com segurança após a conclusão do serviço.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/orcamento-traducoes" className="btn btn-blue" style={{ display: 'inline-block' }}>
            Simular Orçamento Confiável Agora
          </Link>
        </div>
      </div>
    </div>
  );
}
