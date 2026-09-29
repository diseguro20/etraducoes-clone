'use client';

import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511920037059';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá! Vim pelo site e gostaria de solicitar um orçamento de tradução.'
);

export default function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping [animation-delay:0.5s]" />
        {/* Button */}
        <div className="relative flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-3 rounded-full shadow-2xl shadow-green-500/40 transition-all hover:scale-105">
          <MessageCircle size={22} />
          <span className="hidden sm:inline text-sm">Fale conosco</span>
        </div>
      </div>
    </a>
  );
}
