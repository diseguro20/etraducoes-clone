'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { createQuote } from '@/lib/firestore';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: Array<{ label: string; value: string }>;
  isFinal?: boolean;
}

const COMPANY_PHONE = '5511982854183'; // (11) 98285-4183

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [step, setStep] = useState<number>(0);
  // 0: Ask Name, 1: Ask Service, 2: Ask Language, 3: Ask Phone, 4: Done
  const [userName, setUserName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [languagePair, setLanguagePair] = useState('');
  const [phone, setPhone] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial tooltip after 3.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize bot greeting when opened for first time
  const initChat = () => {
    setStep(0);
    setUserName('');
    setServiceType('');
    setLanguagePair('');
    setPhone('');
    setInputValue('');
    setIsTyping(true);

    const now = getCurrentTime();
    setMessages([
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Olá! 👋 Sou o **Brian**, assistente virtual da **TraduzTudo**.',
        time: now,
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-2',
          sender: 'bot',
          text: 'Vou agilizar seu orçamento de tradução para você ser atendido em instantes pelo WhatsApp!',
          time: getCurrentTime(),
        },
      ]);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: 'msg-3',
            sender: 'bot',
            text: 'Para começarmos, qual é o seu **nome**?',
            time: getCurrentTime(),
          },
        ]);
        setTimeout(() => inputRef.current?.focus(), 100);
      }, 500);
    }, 600);
  };

  // Open chatbot when .wpp-btn-trigger is clicked anywhere on the site
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.wpp-btn-trigger');
      if (target) {
        e.preventDefault();
        setIsOpen(true);
        setShowTooltip(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
      setShowTooltip(false);
    };

    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('open-brian-chat', handleCustomOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('open-brian-chat', handleCustomOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Start chat when opened if no messages yet
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initChat();
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  if (pathname === '/orcamento-traducoes') {
    return null;
  }

  // Phone masking
  const handlePhoneChange = (val: string) => {
    if (val.startsWith('+')) {
      setInputValue(val);
      return;
    }
    const digits = val.replace(/\D/g, '');
    if (digits.length <= 2) {
      setInputValue(digits.length > 0 ? `(${digits}` : '');
    } else if (digits.length <= 7) {
      setInputValue(`(${digits.slice(0, 2)}) ${digits.slice(2)}`);
    } else if (digits.length <= 11) {
      setInputValue(`(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`);
    } else {
      setInputValue(`(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`);
    }
  };

  // Bot response flow
  const handleUserResponse = (text: string) => {
    if (!text.trim()) return;
    const now = getCurrentTime();

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: text.trim(),
        time: now,
      },
    ]);
    setInputValue('');
    setIsTyping(true);

    if (step === 0) {
      // Name provided -> Ask service
      const name = text.trim();
      setUserName(name);
      setStep(1);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Prazer, **${name}**! 🤝 Que tipo de serviço você precisa?`,
            time: getCurrentTime(),
            options: [
              { label: '📜 Tradução Juramentada', value: 'Tradução Juramentada' },
              { label: '📄 Tradução Livre / Simples', value: 'Tradução Livre / Simples' },
              { label: '⚙️ Tradução Técnica', value: 'Tradução Técnica' },
              { label: '🏛️ Apostilamento de Haia', value: 'Apostilamento de Haia' },
              { label: '💬 Outros Serviços / Dúvidas', value: 'Outro serviço' },
            ],
          },
        ]);
      }, 500);
    } else if (step === 1) {
      // Service provided -> Ask language
      const service = text.trim();
      setServiceType(service);
      setStep(2);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Perfeito! Qual é o **par de idiomas** dos seus documentos?`,
            time: getCurrentTime(),
            options: [
              { label: '🇧🇷 Português ➔ 🇺🇸 Inglês', value: 'Português para Inglês' },
              { label: '🇺🇸 Inglês ➔ 🇧🇷 Português', value: 'Inglês para Português' },
              { label: '🇧🇷 Português ➔ 🇮🇹 Italiano', value: 'Português para Italiano' },
              { label: '🇧🇷 Português ➔ 🇪🇸 Espanhol', value: 'Português para Espanhol' },
              { label: '🇧🇷 Português ➔ 🇩🇪 Alemão', value: 'Português para Alemão' },
              { label: '🇧🇷 Português ➔ 🇫🇷 Francês', value: 'Português para Francês' },
              { label: '🌐 Outro par de idiomas...', value: 'Outros idiomas' },
            ],
          },
        ]);
      }, 500);
    } else if (step === 2) {
      // Language provided -> Ask phone
      const lang = text.trim();
      setLanguagePair(lang);
      setStep(3);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Excelente! Por fim, qual é o seu **WhatsApp com DDD** para enviarmos seu orçamento?`,
            time: getCurrentTime(),
          },
        ]);
        setTimeout(() => inputRef.current?.focus(), 100);
      }, 500);
    } else if (step === 3) {
      // Phone provided -> Finalize & Redirect
      const userPhone = text.trim();
      setPhone(userPhone);
      setStep(4);

      // Save lead in Firestore
      try {
        createQuote({
          fullName: userName || 'Lead WhatsApp',
          email: 'lead-whatsapp@traduztudo.com.br',
          whatsapp: userPhone,
          serviceType: `${serviceType || 'Tradução'} (${languagePair || 'Idiomas não especificados'})`,
          fileNames: [],
        }).catch((err) => console.error('Erro salvando lead:', err));
      } catch (e) {
        console.error(e);
      }

      const finalGreeting = userName ? `Tudo pronto, **${userName}**! 🎉` : 'Tudo pronto! 🎉';
      const customMessage = `Olá TraduzTudo! Meu nome é ${userName || 'Cliente'}. Gostaria de um orçamento para ${serviceType || 'Tradução'} (${languagePair || 'não especificado'}). Meu WhatsApp de contato: ${userPhone}.`;

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `${finalGreeting} Já registrei seu pedido no nosso sistema e preparei sua mensagem personalizada.\n\nClique no botão abaixo para abrir seu WhatsApp com nossa equipe agora mesmo!`,
            time: getCurrentTime(),
            isFinal: true,
          },
        ]);

        toast.success('Redirecionando para o WhatsApp da TraduzTudo...', { icon: '💬' });

        // Automatic redirect after 1.2 seconds
        setTimeout(() => {
          const encoded = encodeURIComponent(customMessage);
          window.open(`https://wa.me/${COMPANY_PHONE}?text=${encoded}`, '_blank');
        }, 1200);
      }, 600);
    }
  };

  const handleSelectOption = (optValue: string) => {
    handleUserResponse(optValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (step === 3) {
      // Validate phone
      const digits = inputValue.replace(/\D/g, '');
      if (digits.length < 10 && !inputValue.startsWith('+')) {
        toast.error('Por favor, informe um WhatsApp válido com DDD (mínimo 10 dígitos).');
        return;
      }
    }
    handleUserResponse(inputValue);
  };

  const openDirectWhatsApp = () => {
    const text = encodeURIComponent('Olá TraduzTudo! Gostaria de falar com um especialista sobre orçamento de tradução.');
    window.open(`https://wa.me/${COMPANY_PHONE}?text=${text}`, '_blank');
  };

  const finalCustomMessage = `Olá TraduzTudo! Meu nome é ${userName || 'Cliente'}. Gostaria de um orçamento para ${serviceType || 'Tradução'} (${languagePair || 'não especificado'}). Meu WhatsApp de contato: ${phone}.`;

  return (
    <>
      {/* Tooltip callout bubble next to button */}
      {showTooltip && !isOpen && (
        <div
          className="brian-wpp-tooltip"
          onClick={() => {
            setIsOpen(true);
            setShowTooltip(false);
          }}
          title="Abrir chat do WhatsApp"
        >
          <img src="/img/brian.webp" alt="Brian" width="22" height="22" className="brian-tooltip-avatar" />
          <span>Precisa de tradução? Fale com o <strong>Brian</strong>!</span>
          <button
            type="button"
            className="brian-tooltip-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Fechar dica"
          >
            &times;
          </button>
        </div>
      )}

      {/* Floating WhatsApp trigger button */}
      <button
        id="wpp-btn"
        className="wpp-btn-trigger brian-float-btn"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        title="Falar no WhatsApp com Brian"
        aria-label="Falar no WhatsApp com Brian"
      >
        <i className="fab fa-whatsapp"></i>
        <span className="brian-float-badge"></span>
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          id="wpp-popup-overlay"
          className="brian-chat-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div id="wpp-popup" className="brian-chat-window active" role="dialog" aria-modal="true">
          {/* Header */}
          <div className="brian-chat-header">
            <div className="brian-header-left">
              <div className="brian-header-avatar-wrap">
                <img src="/img/brian.webp" alt="Brian" width="40" height="40" className="brian-header-avatar" />
                <span className="brian-online-dot" title="Online agora"></span>
              </div>
              <div className="brian-header-info">
                <div className="brian-header-name">
                  <span>Brian • TraduzTudo</span>
                  <i className="fas fa-badge-check brian-verified-icon" title="Verificado"></i>
                </div>
                <span className="brian-header-status">Assistente Virtual • Online ⚡</span>
              </div>
            </div>
            <div className="brian-header-actions">
              <button
                type="button"
                className="brian-header-btn"
                onClick={initChat}
                title="Reiniciar conversa"
                aria-label="Reiniciar conversa"
              >
                <i className="fas fa-redo-alt"></i>
              </button>
              <button
                type="button"
                id="wpp-popup-close"
                className="brian-header-btn"
                onClick={() => setIsOpen(false)}
                title="Fechar chat"
                aria-label="Fechar chat"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Subheader Notice */}
          <div className="brian-chat-subheader">
            <i className="fas fa-lock"></i>
            <span>Atendimento automatizado com direcionamento direto ao WhatsApp oficial</span>
          </div>

          {/* Chat Messages Body */}
          <div className="brian-chat-body">
            <div className="brian-chat-date-pill">Hoje</div>

            {messages.map((msg) => (
              <div key={msg.id} className={`brian-chat-row ${msg.sender === 'user' ? 'row-user' : 'row-bot'}`}>
                {msg.sender === 'bot' && (
                  <img src="/img/brian.webp" alt="Brian" width="28" height="28" className="brian-bubble-avatar" />
                )}
                <div className={`brian-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-bot'}`}>
                  <div
                    className="brian-bubble-text"
                    dangerouslySetInnerHTML={{
                      __html: msg.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n\n/g, '<br/><br/>')
                        .replace(/\n/g, '<br/>'),
                    }}
                  />

                  {/* Interactive Option Chips */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="brian-options-container">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="brian-chip-btn"
                          onClick={() => handleSelectOption(opt.value)}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Final WhatsApp Action Button */}
                  {msg.isFinal && (
                    <div className="brian-final-action">
                      <a
                        href={`https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(finalCustomMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brian-cta-whatsapp"
                      >
                        <i className="fab fa-whatsapp"></i>
                        <span>Iniciar Conversa no WhatsApp</span>
                      </a>
                      <span className="brian-final-subtext">
                        Abrindo automaticamente... Se não abrir, clique no botão verde acima.
                      </span>
                    </div>
                  )}

                  <div className="brian-bubble-time">
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <i className="fas fa-check-double brian-read-check"></i>}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="brian-chat-row row-bot">
                <img src="/img/brian.webp" alt="Brian" width="28" height="28" className="brian-bubble-avatar" />
                <div className="brian-bubble bubble-bot brian-typing-bubble">
                  <span className="brian-typing-dot"></span>
                  <span className="brian-typing-dot"></span>
                  <span className="brian-typing-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="brian-chat-footer">
            {step < 4 ? (
              <form onSubmit={handleSubmit} className="brian-input-form">
                <input
                  ref={inputRef}
                  type={step === 3 ? 'tel' : 'text'}
                  className="brian-chat-input"
                  placeholder={
                    step === 0
                      ? 'Digite seu nome...'
                      : step === 1
                      ? 'Ou digite o tipo de serviço...'
                      : step === 2
                      ? 'Ou digite os idiomas desejados...'
                      : 'Digite seu WhatsApp com DDD...'
                  }
                  value={inputValue}
                  onChange={(e) => {
                    if (step === 3) {
                      handlePhoneChange(e.target.value);
                    } else {
                      setInputValue(e.target.value);
                    }
                  }}
                  required
                />
                <button
                  type="submit"
                  className="brian-chat-send-btn"
                  title="Enviar"
                  aria-label="Enviar mensagem"
                  disabled={!inputValue.trim()}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            ) : (
              <div className="brian-finished-bar">
                <span>Atendimento pronto no WhatsApp!</span>
              </div>
            )}

            {/* Direct Link Option */}
            <div className="brian-direct-link-wrap">
              <button type="button" className="brian-direct-link" onClick={openDirectWhatsApp}>
                Prefere falar direto? <span className="underline">Toque aqui para abrir sem cadastro</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
