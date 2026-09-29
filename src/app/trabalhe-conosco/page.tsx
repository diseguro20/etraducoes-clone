import type { Metadata } from 'next';
import Link from 'next/link';
import { Users, Briefcase, Award, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trabalhe Conosco | TraduzTudo',
  description: 'Faça parte da rede de tradutores juramentados, técnicos e revisores da TraduzTudo.',
};

export default function TrabalheConoscoPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Oportunidades
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Trabalhe Conosco</h1>
          <p className="text-lg text-gray-600">
            Estamos sempre em busca de tradutores públicos juramentados, tradutores técnicos especializados e revisores comprometidos com a excelência.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <Award className="text-[#2e7ec6] mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-900 mb-2">Tradutor Juramentado</h3>
            <p className="text-xs text-gray-500">Matriculado em Junta Comercial brasileira com certificado digital ICP-Brasil.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <Briefcase className="text-[#2e7ec6] mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-900 mb-2">Tradutor Técnico</h3>
            <p className="text-xs text-gray-500">Especialista em áreas médica, jurídica, engenharia ou finanças corporativas.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <Users className="text-[#2e7ec6] mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-900 mb-2">Revisor & QA</h3>
            <p className="text-xs text-gray-500">Profissional nativo ou bilíngue para controle de qualidade linguístico.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Envie sua apresentação</h2>
          <p className="text-gray-600 mb-6">
            Envie seu currículo, idiomas atendidos, número de matrícula (se juramentado) e áreas de especialidade para:
          </p>
          <a
            href="mailto:contato@traduztudo.com.br?subject=Candidatura%20Tradutor%20TraduzTudo"
            className="btn btn-blue"
            style={{ display: 'inline-block' }}
          >
            Enviar E-mail para contato@traduztudo.com.br
          </a>
        </div>
      </div>
    </div>
  );
}
