'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createQuote } from '@/lib/firestore';

interface OriginalPageTemplateProps {
  html: string;
}

export default function OriginalPageTemplate({ html }: OriginalPageTemplateProps) {
  const [submitting, setSubmitting] = useState(false);
  const [activeModalVideoId, setActiveModalVideoId] = useState<string | null>(null);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // 1. Ensure all lazyloaded images load
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => {
      const el = img as HTMLImageElement;
      const dataSrc = el.getAttribute('data-src');
      if (dataSrc && (!el.src || el.src === window.location.href)) {
        el.src = dataSrc;
      }
    });

    // 2. Intercept quote forms
    const quoteForms = document.querySelectorAll('.request form, .z-two.request form');
    quoteForms.forEach((f) => {
      const form = f as HTMLFormElement;
      const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(form);
        const fullName = (formData.get('full_name') as string) || (formData.get('name') as string) || '';
        const email = (formData.get('email') as string) || (formData.get('mail') as string) || '';
        const whatsapp = (formData.get('wpp') as string) || (formData.get('whatsapp') as string) || '';
        const serviceType = (formData.get('type_service') as string) || 'trad';
        const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement | null;
        const fileNames: string[] = [];
        if (fileInput?.files) {
          for (let i = 0; i < fileInput.files.length; i++) {
            fileNames.push(fileInput.files[i].name);
          }
        }

        try {
          await createQuote({
            fullName,
            email,
            whatsapp,
            serviceType,
            fileNames,
          });
          toast.success('Orçamento solicitado com sucesso! Entraremos em contato em instantes.', { duration: 6000 });
          form.reset();
        } catch (err) {
          console.error('Error submitting quote:', err);
          toast.error('Erro ao enviar pedido. Tente novamente ou chame no WhatsApp.');
        } finally {
          setSubmitting(false);
        }
      };

      form.addEventListener('submit', handleSubmit);
      cleanups.push(() => form.removeEventListener('submit', handleSubmit));
    });

    // 3. Intercept language selector forms (in hero)
    const selectForms = document.querySelectorAll('.about-select form, .about-seletc-size');
    selectForms.forEach((f) => {
      const form = f as HTMLFormElement;
      const handleSelectSubmit = (e: Event) => {
        e.preventDefault();
        const formData = new FormData(form);
        const source = formData.get('source') || '';
        const target = formData.get('target') || '';
        window.location.href = `/orcamento-traducoes?source=${encodeURIComponent(String(source))}&target=${encodeURIComponent(String(target))}`;
      };
      form.addEventListener('submit', handleSelectSubmit);
      cleanups.push(() => form.removeEventListener('submit', handleSelectSubmit));
    });

    // 4. Smooth scrolling for anchors
    const scrollLinks = document.querySelectorAll('.go_to');
    const handleScroll = function(this: Element, e: Event) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const el = document.querySelector(targetId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    scrollLinks.forEach((link) => {
      link.addEventListener('click', handleScroll);
      cleanups.push(() => link.removeEventListener('click', handleScroll));
    });

    // 5. WhatsApp trigger buttons
    const wppButtons = document.querySelectorAll('.wpp-btn-trigger');
    const handleWppClick = (e: Event) => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-brian-chat'));
    };
    wppButtons.forEach((btn) => {
      btn.addEventListener('click', handleWppClick);
      cleanups.push(() => btn.removeEventListener('click', handleWppClick));
    });

    // 6. Accordions (for FAQ and other collapsible sections)
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach((acc) => {
      const handleAccordion = () => {
        acc.classList.toggle('active');
        const content = acc.nextElementSibling as HTMLElement | null;
        if (content && content.classList.contains('accordion_content')) {
          const isOpen = content.style.display === 'block';
          content.style.display = isOpen ? 'none' : 'block';
        }
      };
      acc.addEventListener('click', handleAccordion);
      cleanups.push(() => acc.removeEventListener('click', handleAccordion));
    });

    // 7. Video blocks (.video-block) - Inline YouTube Player
    const videoBlocks = document.querySelectorAll('.video-block');
    videoBlocks.forEach((b) => {
      const block = b as HTMLElement;
      const handleVideoBlockClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // If iframe is already playing, do nothing
        if (block.querySelector('iframe')) return;

        // Retrieve YouTube Video ID
        const iframeHolder = block.querySelector('.video-iframe') as HTMLElement | null;
        let videoId =
          iframeHolder?.getAttribute('data-src') ||
          block.getAttribute('data-src') ||
          block.getAttribute('data-video-id');

        if (!videoId) {
          const img = block.querySelector('img');
          const m = img?.src.match(/\/vi\/([^/]+)\//);
          if (m && m[1]) {
            videoId = m[1];
          }
        }

        if (!videoId) {
          videoId = '24IaCHpTzHQ'; // Default tutorial fallback
        }

        // Hide thumbnail and play button
        const thumb = block.querySelector('.video-thumb') as HTMLElement | null;
        if (thumb) {
          thumb.style.display = 'none';
        }

        // Create responsive YouTube iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
        iframe.title = 'Vídeo Tutorial TraduzTudo';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute(
          'allow',
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        );
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '16px';
        iframe.style.zIndex = '10';

        if (iframeHolder) {
          iframeHolder.innerHTML = '';
          iframeHolder.appendChild(iframe);
          iframeHolder.style.display = 'block';
        } else {
          block.appendChild(iframe);
        }
      };

      block.addEventListener('click', handleVideoBlockClick);
      cleanups.push(() => block.removeEventListener('click', handleVideoBlockClick));
    });

    // 8. Video player buttons (.j_play) - Open in Video Lightbox Modal
    const videoBtns = document.querySelectorAll('.j_play');
    videoBtns.forEach((btn) => {
      const handleVideo = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        const videoId = btn.getAttribute('data-video-id') || 'bXejuFDqILQ';
        setActiveModalVideoId(videoId);
      };
      btn.addEventListener('click', handleVideo);
      cleanups.push(() => btn.removeEventListener('click', handleVideo));
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [html]);

  // Handle escape key to close video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalVideoId(null);
      }
    };
    if (activeModalVideoId) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalVideoId]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {/* Global Video Modal for .j_play buttons */}
      {activeModalVideoId && (
        <div
          className="global-video-modal-overlay"
          onClick={() => setActiveModalVideoId(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="global-video-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="global-video-modal-close"
              onClick={() => setActiveModalVideoId(null)}
              aria-label="Fechar vídeo"
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeModalVideoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
              title="Vídeo Tutorial TraduzTudo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
