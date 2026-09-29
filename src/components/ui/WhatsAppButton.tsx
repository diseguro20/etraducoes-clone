'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { createQuote } from '@/lib/firestore';

const wppHtml = "    <div id=\"wpp-btn\" class=\"wpp-btn-trigger\" title=\"Falar com especialista\">\n        <i class=\"fab fa-whatsapp\"></i>\n    </div>\n\n    <div id=\"wpp-popup-overlay\"></div>\n    <div id=\"wpp-popup\">\n        <div class=\"wpp-popup-header\">\n            <div class=\"wpp-popup-header-icon\">\n                <i class=\"fab fa-whatsapp\"></i>\n            </div>\n            <div class=\"wpp-popup-header-content\">\n                <span class=\"wpp-popup-header-content-title\">Fale com um especialista</span>\n                <p>Preencha seus dados para iniciar a conversa</p>\n            </div>\n            <button type=\"button\" id=\"wpp-popup-close\">&times;</button>\n        </div>\n        <form id=\"wpp-popup-form\" action=\"/whatsapp-lead\" method=\"post\">\n            <input type=\"hidden\" name=\"action\" value=\"whatsapp_lead\" />\n            <div class=\"wpp-form-group\">\n                <label for=\"wpp_full_name\">Nome completo</label>\n                <input type=\"text\" id=\"wpp_full_name\" name=\"full_name\" placeholder=\"Digite seu nome completo\"\n                    required />\n            </div>\n            <div class=\"wpp-form-group\">\n                <label for=\"wpp_phone\">WhatsApp</label>\n                <input type=\"tel\" id=\"whatsapp2\" name=\"phone_display\" placeholder=\"Número de WhatsApp\" required />\n                <div class=\"invalid-feedback\" id=\"phone-error-2\" style=\"display: none;\">\n                    Números brasileiros devem conter o dígito 9 após o DDD\n                </div>\n            </div>\n            <div class=\"wpp-form-group\">\n                <label for=\"wpp_addr_uf\">Estado de residência</label>\n                <select id=\"wpp_addr_uf\" name=\"addr_uf\" required>\n                    <option value=\"\" disabled selected>Selecione um estado *</option>\n                                            <option value=\"EX\">Reside no Exterior</option>\n                                            <option value=\"AC\">Acre</option>\n                                            <option value=\"AL\">Alagoas</option>\n                                            <option value=\"AP\">Amapá</option>";

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname === '/orcamento-traducoes') {
    return null;
  }

  useEffect(() => {
    const triggers = document.querySelectorAll('.wpp-btn-trigger');
    const popup = document.getElementById('wpp-popup');
    const overlay = document.getElementById('wpp-popup-overlay');
    const closeBtn = document.getElementById('wpp-popup-close');
    const form = document.getElementById('wpp-popup-form') as HTMLFormElement | null;

    const openPopup = (e: Event) => {
      e.preventDefault();
      if (popup && overlay) {
        popup.style.display = 'block';
        overlay.style.display = 'block';
      }
    };

    const closePopup = () => {
      if (popup && overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
      }
    };

    triggers.forEach((btn) => btn.addEventListener('click', openPopup));
    closeBtn?.addEventListener('click', closePopup);
    overlay?.addEventListener('click', closePopup);

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      if (!form) return;
      const formData = new FormData(form);
      const fullName = formData.get('full_name') as string;
      const phone = formData.get('phone_display') as string;
      const uf = formData.get('addr_uf') as string;

      try {
        await createQuote({
          fullName,
          email: 'lead-whatsapp@traduztudo.com.br',
          whatsapp: phone,
          serviceType: 'whatsapp-lead: ' + uf,
          fileNames: [],
        });
      } catch (err) {
        console.error('Error saving lead:', err);
      }

      toast.success('Iniciando conversa no WhatsApp...');
      closePopup();
      const cleanPhone = phone.replace(/\D/g, '');
      const text = encodeURIComponent(`Olá! Meu nome é ${fullName} (Estado: ${uf}). Gostaria de informações sobre orçamento de tradução.`);
      window.open(`https://wa.me/5511982854183?text=${text}`, '_blank');
    };

    form?.addEventListener('submit', handleSubmit);

    return () => {
      triggers.forEach((btn) => btn.removeEventListener('click', openPopup));
      closeBtn?.removeEventListener('click', closePopup);
      overlay?.removeEventListener('click', closePopup);
      form?.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: wppHtml }} />;
}
