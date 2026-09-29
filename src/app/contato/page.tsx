import type { Metadata } from 'next';
import QuoteForm from '@/components/forms/QuoteForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contato | TraduzTudo',
  description: 'Entre em contato com a TraduzTudo. Atendemos por WhatsApp, e-mail, telefone e presencialmente em Curitiba, São Paulo e Joinville.',
};

const offices = [
  {
    city: 'Curitiba - PR',
    address: 'Rua Marechal Deodoro, nº 857, Sala 1505, Centro',
    cep: 'CEP 80060-010',
    phone: '(11) 98285-4183',
    maps: 'https://maps.google.com/?q=-25.4291343,-49.2645651',
  },
  {
    city: 'São Paulo - SP',
    address: 'Avenida Angélica, nº 2447, Conjunto 41, Consolação',
    cep: 'CEP 01227-200',
    phone: '(11) 98285-4183',
    maps: 'https://maps.google.com/?q=-23.5536879,-46.6617266',
  },
  {
    city: 'Joinville - SC',
    address: 'Rua Ministro Calógeras, 343, 5º andar, Bucarein',
    cep: 'CEP 89202-207',
    phone: null,
    maps: 'https://maps.google.com/?q=-26.3075931,-48.8433218',
  },
];

export default function ContatoPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Fale Conosco
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estamos prontos para ajudar. Entre em contato pelo canal de sua preferência.
            </p>
          </div>

          {/* Contact options */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <a
              href="https://wa.me/5511982854183"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-green-50 border border-green-200 hover:bg-green-100 rounded-2xl p-8 transition-colors group text-center"
            >
              <span className="text-4xl">💬</span>
              <h3 className="font-bold text-green-800 text-lg">WhatsApp</h3>
              <p className="text-green-700 text-sm">(11) 98285-4183</p>
              <p className="text-green-600 text-xs">Resposta rápida em horário comercial</p>
            </a>
            <div className="flex flex-col items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
              <Phone size={32} className="text-[#2e7ec6]" />
              <h3 className="font-bold text-blue-800 text-lg">Telefone</h3>
              <p className="text-blue-700 text-sm font-semibold">(11) 98285-4183</p>
              <p className="text-blue-600 text-xs">Gratuito — Seg a Sex, 9h às 18h</p>
            </div>
            <a
              href="mailto:contato@traduztudo.com.br"
              className="flex flex-col items-center gap-3 bg-purple-50 border border-purple-200 hover:bg-purple-100 rounded-2xl p-8 transition-colors text-center"
            >
              <Mail size={32} className="text-purple-600" />
              <h3 className="font-bold text-purple-800 text-lg">E-mail</h3>
              <p className="text-purple-700 text-sm">contato@traduztudo.com.br</p>
              <p className="text-purple-600 text-xs">Resposta em até 2 horas úteis</p>
            </a>
          </div>

          {/* Office hours */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-12 max-w-md mx-auto flex items-center gap-4">
            <Clock size={24} className="text-[#2e7ec6] shrink-0" />
            <div>
              <p className="font-bold text-gray-900">Horário de Atendimento</p>
              <p className="text-gray-600 text-sm">Segunda a Sexta: 09:00 às 18:00</p>
              <p className="text-gray-400 text-xs">Horário de Brasília</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Nossos Escritórios
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div key={office.city} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg mb-3">{office.city}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-[#2e7ec6] shrink-0 mt-0.5" />
                    <div>
                      <p>{office.address}</p>
                      <p className="text-gray-400">{office.cep}</p>
                    </div>
                  </div>
                  {office.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-[#2e7ec6]" />
                      <a href={`tel:${office.phone}`} className="hover:text-[#2e7ec6] transition-colors">
                        {office.phone}
                      </a>
                    </div>
                  )}
                </div>
                <a
                  href={office.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2e7ec6] text-sm font-semibold hover:underline"
                >
                  Ver no Google Maps →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick quote */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Ou solicite um orçamento agora</h2>
            <p className="text-gray-500">Receba o preço e prazo em minutos, sem espera.</p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
