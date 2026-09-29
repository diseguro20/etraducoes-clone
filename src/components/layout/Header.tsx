'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const services = [
  { label: 'Tradução Juramentada', href: '/traducao-juramentada' },
  { label: 'Tradução Certificada', href: '/traducao-certificada' },
  { label: 'Tradução Técnica', href: '/traducao-tecnica' },
  { label: 'Apostilamento de Haia', href: '/apostilamento-de-haia' },
  { label: 'Plataforma AIUTA', href: '/plataforma-de-traducao' },
];

const languages = [
  { label: 'Português', href: '/traducao-de-portugues', flag: '🇧🇷' },
  { label: 'Inglês', href: '/traducao-de-ingles', flag: '🇺🇸' },
  { label: 'Espanhol', href: '/traducao-de-espanhol', flag: '🇪🇸' },
  { label: 'Italiano', href: '/traducao-de-italiano', flag: '🇮🇹' },
  { label: 'Francês', href: '/traducao-frances', flag: '🇫🇷' },
  { label: 'Alemão', href: '/traducao-de-alemao', flag: '🇩🇪' },
  { label: 'Russo', href: '/traducao-russo', flag: '🇷🇺' },
  { label: 'Mandarim', href: '/traducao-mandarim', flag: '🇨🇳' },
  { label: 'Holandês', href: '/traducao-de-holandes', flag: '🇳🇱' },
  { label: 'Ver todos', href: '/idiomas', flag: '🌍' },
];

const areas = [
  { label: 'Acadêmico', href: '/traducao-academica' },
  { label: 'Casamento', href: '/traducao-juramentada-para-casamento' },
  { label: 'Certidões', href: '/traducao-juramentada-de-certidoes' },
  { label: 'Cidadania Italiana', href: '/traducao-juramentada-para-cidadania-italiana' },
  { label: 'Docs Pessoais', href: '/traducao-de-documentos' },
  { label: 'Intercâmbio', href: '/traducao-para-intercambio' },
  { label: 'Jurídico', href: '/traducao-tecnica' },
  { label: 'Empresarial', href: '/traducao-tecnica' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white transition-shadow duration-300',
        scrolled ? 'shadow-md' : 'shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-2xl font-extrabold text-[#2e7ec6]">e</span>
              <span className="text-2xl font-extrabold text-[#1a5fa8]">Traduções</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-[#2e7ec6] font-medium transition-colors">
                Serviços e Idiomas
                <ChevronDown size={16} className={cn('transition-transform', servicesOpen && 'rotate-180')} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[700px]">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Serviços</p>
                      <ul className="space-y-2">
                        {services.map((s) => (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              className="text-sm text-gray-700 hover:text-[#2e7ec6] hover:translate-x-1 inline-block transition-all"
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Idiomas</p>
                      <ul className="space-y-2">
                        {languages.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              className="text-sm text-gray-700 hover:text-[#2e7ec6] flex items-center gap-2 transition-colors"
                            >
                              <span>{l.flag}</span> {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Áreas</p>
                      <ul className="space-y-2">
                        {areas.map((a) => (
                          <li key={a.label}>
                            <Link
                              href={a.href}
                              className="text-sm text-gray-700 hover:text-[#2e7ec6] transition-colors"
                            >
                              {a.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/sobre-nos" className="text-gray-700 hover:text-[#2e7ec6] font-medium transition-colors">
              Sobre Nós
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#2e7ec6] font-medium transition-colors">
              Blog
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-[#2e7ec6] font-medium transition-colors">
              Contato
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/me/pedidos"
                  className="flex items-center gap-2 text-gray-700 hover:text-[#2e7ec6] font-medium transition-colors"
                >
                  <User size={18} />
                  {profile?.fullName?.split(' ')[0] || 'Minha conta'}
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                href="/me/login"
                className="flex items-center gap-2 text-gray-700 hover:text-[#2e7ec6] font-medium transition-colors"
              >
                <User size={18} />
                Entrar
              </Link>
            )}
            <Link
              href="/orcamento-traducoes"
              className="bg-[#2e7ec6] hover:bg-[#1a5fa8] text-white font-bold px-6 py-2.5 rounded-full transition-colors shadow-lg hover:shadow-xl"
            >
              Orçamento Instantâneo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Serviços</p>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-gray-700 hover:text-[#2e7ec6] font-medium"
              >
                {s.label}
              </Link>
            ))}
          </div>
          <hr />
          <Link href="/sobre-nos" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-700 font-medium">Sobre Nós</Link>
          <Link href="/contato" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-700 font-medium">Contato</Link>
          <hr />
          {user ? (
            <div className="space-y-2">
              <Link href="/me/pedidos" onClick={() => setMobileOpen(false)} className="block py-2 text-[#2e7ec6] font-bold">Minha Conta</Link>
              <button onClick={logout} className="block py-2 text-red-500">Sair</button>
            </div>
          ) : (
            <Link href="/me/login" onClick={() => setMobileOpen(false)} className="block py-2 text-[#2e7ec6] font-bold">Entrar</Link>
          )}
          <Link
            href="/orcamento-traducoes"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center bg-[#2e7ec6] text-white font-bold py-3 rounded-full"
          >
            Orçamento Instantâneo
          </Link>
        </div>
      )}
    </header>
  );
}
