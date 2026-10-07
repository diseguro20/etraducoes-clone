'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { createQuote } from '@/lib/firestore';
import { readFilesAsAttachments } from '@/lib/utils';

export default function OrcamentoPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [addrUf, setAddrUf] = useState('');
  const [typeService, setTypeService] = useState('trad');
  const [sourceLang, setSourceLang] = useState('Português');
  const [targetLang, setTargetLang] = useState('Inglês');
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // Format and validate phone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 13) val = val.slice(0, 13);

    // If starts with 55 (Brazil country code)
    if (val.startsWith('55') && val.length > 2) {
      const ddd = val.slice(2, 4);
      const rest = val.slice(4);
      if (rest.length > 5) {
        val = `+55 (${ddd}) ${rest.slice(0, 5)}-${rest.slice(5, 9)}`;
      } else if (rest.length > 0) {
        val = `+55 (${ddd}) ${rest}`;
      } else {
        val = `+55 (${ddd}`;
      }
    } else if (val.length > 10) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7, 11)}`;
    } else if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    }

    setWhatsapp(val);

    // Brazilian phone check
    const digits = val.replace(/\D/g, '');
    if (digits.length === 10 && !val.startsWith('+')) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const incoming = Array.from(e.target.files);
      setFiles((prev) => {
        const next = [...prev];
        incoming.forEach((f) => {
          if (!next.some((existing) => existing.name === f.name && existing.size === f.size)) {
            next.push(f);
          }
        });
        return next;
      });
      toast.success(
        incoming.length === 1
          ? '✓ Documento anexado com sucesso!'
          : `✓ ${incoming.length} documentos anexados com sucesso!`
      );
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !whatsapp || !addrUf || !typeService) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSubmitting(true);
    try {
      const attachedData = await readFilesAsAttachments(files);
      const fileNames = attachedData.map((f) => f.name);
      const serviceLabel =
        typeService === 'apostille' ? 'Apenas Apostilamento de Haia' : 'Tradução de Documentos';

      await createQuote({
        fullName,
        email,
        whatsapp,
        serviceType: serviceLabel,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        fileNames,
        files: attachedData,
        notes: [
          `Idiomas: ${sourceLang} → ${targetLang}`,
          `Estado de residência: ${addrUf}. Total de arquivos: ${files.length}.`,
        ].join('\n'),
      });

      toast.success(
        'Orçamento enviado com sucesso! Nossa equipe analisará e retornará em instantes.',
        { duration: 6000 }
      );

      // Open WhatsApp pre-filled link after saving to Firestore
      const cleanPhone = whatsapp.replace(/\D/g, '');
      const text = encodeURIComponent(
        `Olá! Meu nome é ${fullName} (${addrUf}). Acabei de enviar um pedido de orçamento de ${serviceLabel} (${sourceLang} para ${targetLang}). Gostaria de agilizar o atendimento.`
      );
      setTimeout(() => {
        window.open(`https://wa.me/5511982854183?text=${text}`, '_blank');
      }, 1000);

      // Clear inputs
      setFullName('');
      setEmail('');
      setWhatsapp('');
      setFiles([]);
    } catch (err) {
      console.error('Error submitting quote:', err);
      toast.error('Erro ao enviar orçamento. Entre em contato diretamente pelo WhatsApp: (11) 98285-4183');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/css/deals.css" />

      <div className="deals">
        {/* Left Column: Form & Brand */}
        <div className="deals_content">
          {/* Header */}
          <div className="deals_content_header">
            <div className="deals_content_header_logo">
              <Link href="/" title="Voltar para página inicial" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <img
                  src="/img/traduztudo-official-logo.png"
                  alt="TraduzTudo"
                  className="traduztudo-logo-light"
                  width="180"
                  height="50"
                  style={{ height: '46px', width: 'auto' }}
                />
                <img
                  src="/img/traduztudo-official-logo-white.png"
                  alt="TraduzTudo"
                  className="traduztudo-logo-dark"
                  width="180"
                  height="50"
                  style={{ height: '46px', width: 'auto' }}
                />
              </Link>
            </div>

            <div className="deals_content_header_nav" style={{ position: 'relative' }}>
              <div
                className="deals_content_header_nav_avatar j_nav_button"
                onClick={() => setNavOpen(!navOpen)}
                style={{ cursor: 'pointer' }}
                title="Minha conta"
              >
                <img
                  className="user_photo"
                  src="/themes/deals/assets/img/no_avatar.jpg"
                  alt="Avatar"
                />
              </div>

              {navOpen && (
                <div className="deals_content_header_nav_open" style={{ display: 'block' }}>
                  <div className="deals_content_header_nav_header">
                    <div className="deals_content_header_nav_header_user">
                      <div>
                        <h2>Olá Visitante</h2>
                        <p>Já possui uma conta?</p>
                      </div>
                    </div>
                    <Link href="/me/login" className="btn btn-outline btn-small">
                      Entrar
                    </Link>
                  </div>
                  <div className="deals_content_header_nav_content">
                    <ul>
                      <li>
                        <Link href="/me/login">
                          <i className="far fa-user" style={{ marginRight: '8px' }}></i> Meus Pedidos
                        </Link>
                      </li>
                      <li>
                        <Link href="/contato">
                          <i className="far fa-envelope" style={{ marginRight: '8px' }}></i> Suporte
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Container */}
          <div className="deals_content_form">
            <div className="deals_content_form_header" style={{ alignItems: 'center' }}>
              <div className="deals_content_form_header_title">
                <h1>Orçamento de Tradução</h1>
              </div>
              <div className="deals_content_form_info" style={{ justifyContent: 'flex-end', flex: 'initial' }}>
                <div
                  className="secure"
                  style={{
                    background: '#d7f3e7',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div className="deals_content_form_info_icon">
                    <i className="far fa-lock-alt" style={{ color: 'var(--color-green)' }}></i>
                  </div>
                  <div className="deals_content_form_info_text">
                    <p style={{ color: 'var(--color-green)', marginBottom: 0, fontWeight: 600, fontSize: '14px' }}>
                      Sigilo total dos dados
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
              <input type="hidden" name="action" value="create" />

              {/* Row 1: Name and Email */}
              <div className="label_g2">
                <label className="label">
                  <span className="legend">Nome completo</span>
                  <input
                    type="text"
                    name="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </label>
                <label className="label">
                  <span className="legend">E-mail</span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu melhor e-mail"
                    required
                  />
                </label>
              </div>

              {/* Row 2: WhatsApp and UF */}
              <div className="label_g2">
                <label className="label">
                  <div className="label" style={{ marginBottom: 0 }}>
                    <span className="legend" style={{ display: 'inline-block' }}>
                      WhatsApp
                    </span>
                    <span
                      style={{ fontSize: '0.9em', marginLeft: '10px', cursor: 'help' }}
                      className="simple-tooltip color-blue-light"
                      title="Formato: Código do País + DDD + Número de WhatsApp. Utilize apenas números sem espaços."
                    >
                      <i className="far fa-question-circle"></i>
                    </span>
                  </div>
                  <div className="label" style={{ marginBottom: 0 }}>
                    <input
                      type="tel"
                      name="wpp"
                      id="whatsapp"
                      value={whatsapp}
                      onChange={handlePhoneChange}
                      placeholder="(11) 98285-4183"
                      autoComplete="none"
                      required
                    />
                    {phoneError && (
                      <div className="invalid-feedback" id="phone-error" style={{ display: 'block', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                        Números brasileiros devem conter o dígito 9 após o DDD
                      </div>
                    )}
                  </div>
                </label>

                <label className="label">
                  <span className="legend">Estado de residência</span>
                  <select
                    name="addr_uf"
                    className="addr_uf"
                    value={addrUf}
                    onChange={(e) => setAddrUf(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecione um estado *
                    </option>
                    <option value="EX">Reside no Exterior</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </label>
              </div>

              {/* Service Type */}
              <label className="label">
                <span className="legend">Tipo de serviço</span>
                <select
                  name="type_service"
                  value={typeService}
                  onChange={(e) => setTypeService(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecione *
                  </option>
                  <option value="trad">Tradução de Documentos</option>
                  <option value="apostille">Só Apostilas</option>
                </select>
              </label>

              {/* Language Pair Selectors */}
              <div className="label_g2">
                <label className="label">
                  <span className="legend">Idioma de origem (De)</span>
                  <select
                    name="source_lang"
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    required
                  >
                    <option value="Português">🇧🇷 Português</option>
                    <option value="Inglês">🇺🇸 Inglês</option>
                    <option value="Espanhol">🇪🇸 Espanhol</option>
                    <option value="Italiano">🇮🇹 Italiano</option>
                    <option value="Francês">🇫🇷 Francês</option>
                    <option value="Alemão">🇩🇪 Alemão</option>
                    <option value="Mandarim">🇨🇳 Mandarim (Chinês)</option>
                    <option value="Japonês">🇯🇵 Japonês</option>
                    <option value="Árabe">🇸🇦 Árabe</option>
                    <option value="Russo">🇷🇺 Russo</option>
                    <option value="Holandês">🇳🇱 Holandês</option>
                    <option value="Coreano">🇰🇷 Coreano</option>
                    <option value="Hebraico">🇮🇱 Hebraico</option>
                    <option value="Outro">🌐 Outro idioma</option>
                  </select>
                </label>

                <label className="label">
                  <span className="legend">Traduzir para (Para)</span>
                  <select
                    name="target_lang"
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    required
                  >
                    <option value="Inglês">🇺🇸 Inglês</option>
                    <option value="Espanhol">🇪🇸 Espanhol</option>
                    <option value="Português">🇧🇷 Português</option>
                    <option value="Italiano">🇮🇹 Italiano</option>
                    <option value="Francês">🇫🇷 Francês</option>
                    <option value="Alemão">🇩🇪 Alemão</option>
                    <option value="Mandarim">🇨🇳 Mandarim (Chinês)</option>
                    <option value="Japonês">🇯🇵 Japonês</option>
                    <option value="Árabe">🇸🇦 Árabe</option>
                    <option value="Russo">🇷🇺 Russo</option>
                    <option value="Holandês">🇳🇱 Holandês</option>
                    <option value="Coreano">🇰🇷 Coreano</option>
                    <option value="Hebraico">🇮🇱 Hebraico</option>
                    <option value="Outro">🌐 Outro idioma</option>
                  </select>
                </label>
              </div>

              {/* Documents Upload Section */}
              <div className="label" style={{ marginBottom: 0 }}>
                <span className="legend" style={{ marginBottom: 0, display: 'inline-block' }}>
                  Documentos para tradução (opcional)
                </span>
              </div>

              <div className="label">
                <input
                  type="file"
                  name="files[]"
                  multiple
                  onChange={handleFileChange}
                  className="file_uploader"
                  style={{ height: '52px', paddingTop: '14px' }}
                />
                <span style={{ fontSize: '0.875em', color: 'var(--color-secundary)', display: 'block', marginTop: '10px' }}>
                  Tamanho máximo de upload: <strong>1 GB</strong>
                </span>

                {files.length > 0 && (
                  <div className="modern-attached-files-container" style={{ marginTop: '12px' }}>
                    <div className="modern-attached-summary">
                      <span>✓ {files.length} documento{files.length > 1 ? 's' : ''} anexado{files.length > 1 ? 's' : ''}</span>
                      <span>Pronto para análise</span>
                    </div>
                    {files.map((file, idx) => {
                      const ext = file.name.split('.').pop()?.toLowerCase() || '';
                      let iconClass = 'fas fa-file-alt';
                      let colorClass = 'is-generic';
                      if (['pdf'].includes(ext)) {
                        iconClass = 'fas fa-file-pdf';
                        colorClass = 'is-pdf';
                      } else if (['doc', 'docx', 'odt', 'rtf', 'txt'].includes(ext)) {
                        iconClass = 'fas fa-file-word';
                        colorClass = 'is-word';
                      } else if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp'].includes(ext)) {
                        iconClass = 'fas fa-file-image';
                        colorClass = 'is-image';
                      }

                      const sizeFormatted =
                        file.size < 1024
                          ? `${file.size} B`
                          : file.size < 1048576
                          ? `${(file.size / 1024).toFixed(1)} KB`
                          : `${(file.size / 1048576).toFixed(1)} MB`;

                      return (
                        <div key={`${file.name}-${idx}`} className="modern-attached-file-item">
                          <div className="modern-attached-file-left">
                            <div className={`modern-attached-file-icon ${colorClass}`}>
                              <i className={iconClass}></i>
                            </div>
                            <div className="modern-attached-file-details">
                              <span className="modern-attached-file-name" title={file.name}>
                                {file.name}
                              </span>
                              <span className="modern-attached-file-meta">
                                <span>{sizeFormatted}</span>
                                <span className="badge-ready">
                                  <i className="fas fa-check"></i> Anexado
                                </span>
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="modern-attached-file-remove"
                            onClick={() => handleRemoveFile(idx)}
                            title="Remover documento"
                            aria-label={`Remover ${file.name}`}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Privacy Policy */}
              <p style={{ margin: '12px 0 0', display: 'block', fontSize: '0.875em', color: 'var(--color-secundary)' }}>
                Trataremos seus dados conforme nossa{' '}
                <Link
                  style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                  href="/politicas-de-privacidade"
                  target="_blank"
                  title="Políticas de Privacidade"
                >
                  Política de Privacidade
                </Link>
                .
              </p>

              {/* Action Button */}
              <div className="action" style={{ marginTop: '24px' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-blue"
                  style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}
                >
                  {submitting ? (
                    <>
                      Enviando... <i className="fas fa-spinner fa-spin" style={{ marginLeft: '8px' }}></i>
                    </>
                  ) : (
                    <>
                      Continuar <i className="far fa-long-arrow-alt-right" style={{ marginLeft: '8px' }}></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Attention info and Reviews Photo */}
        <div className="deals_aside aside-info">
          <div className="aside-info-item">
            <div className="aside-info-content">
              <span className="title-md">Atenção!</span>
              <ul>
                <li>
                  Não envie documentos emitidos no Brasil com <strong>Apostila de Haia</strong>, pois isso aumenta o
                  preço das suas traduções.
                </li>
                <li>
                  Não envie documentos <strong>escritos à mão</strong>, precisamos verificar a viabilidade da
                  tradução.
                </li>
                <li>Documentos plastificados ou muito antigos não podem ser apostilados.</li>
                <li>
                  Em ambos os casos,{' '}
                  <a
                    href="https://wa.me/5511982854183"
                    target="_blank"
                    rel="nofollow"
                    style={{ textDecoration: 'underline' }}
                  >
                    <strong>chame um especialista no WhatsApp</strong>
                  </a>
                  .
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, rgba(46,126,198,0.08) 0%, rgba(46,126,198,0.02) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '8px 16px', borderRadius: '50px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '16px' }}>
              <img src="/themes/web/assets/img/google.svg" alt="Google" width="18" height="18" />
              <span style={{ fontWeight: 700, fontSize: '13px', color: '#1a1a1a' }}>Google Avaliações</span>
              <span style={{ color: '#f59e0b', fontSize: '13px' }}>★ 4.9/5</span>
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px', color: 'var(--color-primary)' }}>
              Traduções Rápidas &amp; Aceitas no Exterior
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--color-secundary)', margin: '0 0 16px', lineHeight: 1.5 }}>
              Mais de 1.350 clientes atendidos com nota máxima em São Paulo e em todo o Brasil.
            </p>
            <Link
              href="/avaliacoes"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-primary)',
                textDecoration: 'underline',
              }}
            >
              Ver avaliações verificadas <i className="far fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
