import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  servicos: [
    { label: 'Tradução Juramentada', href: '/traducao-juramentada' },
    { label: 'Tradução Certificada', href: '/traducao-certificada' },
    { label: 'Tradução Técnica', href: '/traducao-tecnica' },
    { label: 'Apostilamento de Haia', href: '/apostilamento-de-haia' },
    { label: 'Plataforma AIUTA', href: '/plataforma-de-traducao' },
  ],
  idiomas: [
    { label: 'Inglês', href: '/traducao-de-ingles' },
    { label: 'Espanhol', href: '/traducao-de-espanhol' },
    { label: 'Italiano', href: '/traducao-de-italiano' },
    { label: 'Francês', href: '/traducao-frances' },
    { label: 'Alemão', href: '/traducao-de-alemao' },
    { label: 'Ver todos', href: '/idiomas' },
  ],
  empresa: [
    { label: 'Sobre Nós', href: '/sobre-nos' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contato', href: '/contato' },
    { label: 'Política de Privacidade', href: '/politicas-de-privacidade' },
    { label: 'Termos de Uso', href: '/termos-de-uso' },
  ],
};

const offices = [
  { city: 'Curitiba', address: 'Rua Marechal Deodoro, 857, Sala 1505', phone: '+55 41 3017-5521' },
  { city: 'São Paulo', address: 'Av. Angélica, 2447, Conjunto 41', phone: '+55 11 3231-1239' },
  { city: 'Joinville', address: 'Rua Min. Calógeras, 343, 5º andar', phone: null },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      {/* Top bar */}
      <div className="bg-[#2e7ec6] py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-semibold text-sm">
            📞 Ligue grátis: <strong>0800 604 2484</strong> — Seg a Sex, 9h às 18h
          </p>
          <Link
            href="/orcamento-traducoes"
            className="bg-white text-[#2e7ec6] font-bold px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors"
          >
            Solicitar Orçamento
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-extrabold text-white">
                e<span className="text-[#2e7ec6]">Traduções</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Empresa brasileira de tradução juramentada, certificada e técnica, e de
              apostilamento de Haia. Atendemos +14 idiomas, com escritórios em Curitiba,
              São Paulo e Joinville.
            </p>
            <p className="text-gray-500 text-xs mb-4">CNPJ: 14.617.747/0001-06 — AITRADBRASIL LTDA</p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-4">
              {[
                { label: 'Instagram', href: 'https://instagram.com/etraducoes', emoji: '📷' },
                { label: 'Facebook', href: 'https://facebook.com/etraducoes', emoji: '👍' },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/etraducoes', emoji: '💼' },
                { label: 'YouTube', href: 'https://youtube.com/channel/UCkx45nZMoVAA1TCHEOeqntQ', emoji: '▶️' },
              ].map(({ label, href, emoji }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#2e7ec6] transition-colors text-sm"
                >
                  {emoji}
                </a>
              ))}
            </div>

            {/* Offices */}
            <div className="mt-6 space-y-3">
              {offices.map((o) => (
                <div key={o.city} className="flex items-start gap-2 text-sm">
                  <MapPin size={14} className="text-[#2e7ec6] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-semibold">{o.city}</p>
                    <p className="text-gray-400">{o.address}</p>
                    {o.phone && <p className="text-gray-400">{o.phone}</p>}
                  </div>
                </div>
              ))}
              <a href="mailto:contato@etraducoes.com.br" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={14} className="text-[#2e7ec6]" />
                contato@etraducoes.com.br
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Serviços</h4>
            <ul className="space-y-2">
              {footerLinks.servicos.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Idiomas</h4>
            <ul className="space-y-2">
              {footerLinks.idiomas.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} eTraduções — AITRADBRASIL LTDA. Todos os direitos reservados.</p>
          <p>Membro da <strong className="text-gray-400">American Translators Association (ATA)</strong></p>
        </div>
      </div>
    </footer>
  );
}
