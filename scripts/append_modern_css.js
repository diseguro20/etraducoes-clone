const fs = require('fs');

const cssToAppend = `
/* ==========================================================================
   2026 WORLD-CLASS REDESIGN EXPANSIONS - TRADUZTUDO
   ========================================================================== */

/* 1. Form Compact Rows */
.modern-form-card {
  padding: 24px 26px !important;
}

.modern-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 575px) {
  .modern-form-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

.modern-input-group {
  margin-bottom: 12px !important;
}

.modern-input-label {
  font-size: 12.5px !important;
  margin-bottom: 4px !important;
}

.modern-input-field {
  height: 42px !important;
  font-size: 13.5px !important;
}

/* Compact Modern Dropzone */
.modern-dropzone-compact {
  position: relative;
  border: 1.5px dashed #cbd5e1;
  border-radius: 10px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modern-dropzone-compact:hover {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.04);
}

[data-theme="dark"] .modern-dropzone-compact,
body.theme-dark .modern-dropzone-compact {
  background: #18233a;
  border-color: #2b3a56;
}

[data-theme="dark"] .modern-dropzone-compact:hover,
body.theme-dark .modern-dropzone-compact:hover {
  border-color: #38bdf8;
  background: rgba(56, 189, 248, 0.06);
}

.modern-dropzone-compact .modern-dropzone-icon {
  font-size: 20px;
  color: #2563eb;
  flex-shrink: 0;
}

[data-theme="dark"] .modern-dropzone-compact .modern-dropzone-icon,
body.theme-dark .modern-dropzone-compact .modern-dropzone-icon {
  color: #38bdf8;
}

.modern-dropzone-compact .modern-dropzone-info {
  display: flex;
  flex-direction: column;
}

.modern-dropzone-compact .modern-dropzone-info strong {
  font-size: 12.5px;
  color: var(--color-default);
}

.modern-dropzone-compact .modern-dropzone-info span {
  font-size: 11px;
  color: #64748b;
}

[data-theme="dark"] .modern-dropzone-compact .modern-dropzone-info span,
body.theme-dark .modern-dropzone-compact .modern-dropzone-info span {
  color: #94a3b8;
}

/* 2. Hero Trust Metrics Strip */
.modern-hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 24px;
}

@media (max-width: 767px) {
  .modern-hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

.modern-stat-item {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 12px;
  padding: 12px 14px;
  backdrop-filter: blur(8px);
  text-align: center;
  transition: all 0.25s ease;
}

.modern-stat-item:hover {
  transform: translateY(-2px);
  border-color: #38bdf8;
  box-shadow: 0 8px 20px -5px rgba(14, 165, 233, 0.15);
}

[data-theme="dark"] .modern-stat-item,
body.theme-dark .modern-stat-item {
  background: rgba(26, 34, 52, 0.6);
  border-color: rgba(51, 65, 85, 0.7);
}

.modern-stat-num {
  font-size: 15px;
  font-weight: 800;
  color: var(--color-default);
  line-height: 1.2;
}

.modern-stat-label {
  font-size: 11px;
  color: var(--color-secundary);
  margin-top: 3px;
  white-space: nowrap;
}

/* 3. Section Headers & Badges */
.modern-section-header {
  margin-bottom: 40px;
}

.modern-section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.25);
  border-radius: 9999px;
  padding: 5px 16px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #2563eb;
  margin-bottom: 12px;
}

[data-theme="dark"] .modern-section-badge,
body.theme-dark .modern-section-badge {
  background: rgba(56, 189, 248, 0.12);
  border-color: rgba(56, 189, 248, 0.3);
  color: #38bdf8;
}

.modern-section-title {
  font-size: clamp(2rem, 3.2vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--color-default);
  margin-bottom: 12px;
  line-height: 1.2;
}

.modern-section-desc {
  font-size: 1.1rem;
  color: var(--color-secundary);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 4. Section 2: Global Network */
.modern-network-section {
  padding: 80px 0;
  background: #080d1a;
  color: #f8fafc;
  position: relative;
}

.modern-network-section .modern-section-title {
  color: #ffffff !important;
}

.modern-network-section .modern-section-desc {
  color: #94a3b8 !important;
}

.modern-guarantees-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 50px;
}

@media (max-width: 991px) {
  .modern-guarantees-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575px) {
  .modern-guarantees-grid {
    grid-template-columns: 1fr;
  }
}

.modern-guarantee-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px 20px;
  transition: all 0.3s ease;
}

.modern-guarantee-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.4);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.5);
}

.modern-guarantee-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(37, 99, 235, 0.2));
  color: #38bdf8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 16px;
}

.modern-guarantee-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
}

.modern-guarantee-card p {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.55;
  margin: 0;
}

.modern-map-wrapper {
  position: relative;
}

.modern-map-wrapper .img-map {
  margin: 0 auto;
}

.modern-lang-chips {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 36px;
}

@media (max-width: 991px) {
  .modern-lang-chips {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575px) {
  .modern-lang-chips {
    grid-template-columns: 1fr;
  }
}

.modern-lang-chip {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 10px 14px;
  color: #f8fafc !important;
  text-decoration: none !important;
  transition: all 0.2s ease;
}

.modern-lang-chip:hover {
  background: rgba(37, 99, 235, 0.25);
  border-color: #38bdf8;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -5px rgba(56, 189, 248, 0.25);
}

.modern-lang-chip strong {
  display: block;
  font-size: 13.5px;
  line-height: 1.2;
  color: #ffffff;
}

.modern-lang-chip span {
  display: block;
  font-size: 11px;
  color: #94a3b8;
}

/* 5. Section 3: Apostilamento de Haia */
.modern-apostille-section {
  padding: 80px 0;
}

.modern-apostille-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 28px;
  padding: 48px;
  box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.06);
  transition: all 0.3s ease;
}

[data-theme="dark"] .modern-apostille-card,
body.theme-dark .modern-apostille-card {
  background: #0f172a;
  border-color: #1e293b;
  box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.5);
}

.modern-apostille-img-wrapper {
  position: relative;
}

.modern-apostille-img {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.12));
  transition: transform 0.4s ease;
}

.modern-apostille-img:hover {
  transform: translateY(-4px) scale(1.02);
}

.modern-apostille-title {
  font-size: clamp(1.8rem, 2.6vw, 2.3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-default);
  margin: 12px 0 16px;
  line-height: 1.2;
}

.modern-apostille-desc {
  font-size: 1.05rem;
  color: var(--color-secundary);
  line-height: 1.65;
  margin-bottom: 24px;
}

.modern-apostille-checklist {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.modern-check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-default);
}

.modern-check-item i {
  color: #10b981;
  font-size: 16px;
  flex-shrink: 0;
}

.modern-apostille-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

/* 6. Section 4: Steps (Como Funciona) */
.modern-steps-section {
  padding: 80px 0;
  background: var(--bg-body);
}

.modern-steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 991px) {
  .modern-steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575px) {
  .modern-steps-grid {
    grid-template-columns: 1fr;
  }
}

.modern-step-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 32px 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
}

.modern-step-card:hover {
  transform: translateY(-6px);
  border-color: #38bdf8;
  box-shadow: 0 20px 30px -10px rgba(15, 23, 42, 0.1);
}

[data-theme="dark"] .modern-step-card,
body.theme-dark .modern-step-card {
  background: #111a2e;
  border-color: #243048;
}

[data-theme="dark"] .modern-step-card:hover,
body.theme-dark .modern-step-card:hover {
  border-color: #38bdf8;
  box-shadow: 0 20px 30px -10px rgba(56, 189, 248, 0.15);
}

.modern-step-number {
  position: absolute;
  top: 18px;
  right: 22px;
  font-size: 26px;
  font-weight: 900;
  opacity: 0.15;
  color: var(--color-blue, #2563eb);
}

.modern-step-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 20px;
}

[data-theme="dark"] .modern-step-icon,
body.theme-dark .modern-step-icon {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
}

.modern-step-card h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--color-default);
  margin-bottom: 10px;
}

.modern-step-card p {
  font-size: 13.5px;
  color: var(--color-secundary);
  line-height: 1.6;
  margin: 0;
}

/* 7. Section 5: Documents Section */
.modern-docs-section {
  padding: 80px 0;
}

/* 8. Section 6: Brian WhatsApp Interaction */
.modern-brian-section {
  padding: 80px 0;
  background: rgba(248, 250, 252, 0.6);
}

[data-theme="dark"] .modern-brian-section,
body.theme-dark .modern-brian-section {
  background: rgba(15, 23, 42, 0.5);
}

.modern-brian-points {
  list-style: none;
  padding: 0;
  margin: 20px 0 28px 0;
}

.modern-brian-points li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-default);
  margin-bottom: 12px;
}

.modern-brian-points li i {
  color: #10b981;
}

.modern-brian-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

.modern-phone-wrapper {
  position: relative;
}

.modern-phone-mockup {
  max-width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.25);
}

/* 9. Section 7: Google Reviews */
.modern-reviews-section {
  padding: 80px 0;
}

.modern-review-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 20px !important;
  padding: 26px !important;
}

.modern-review-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.modern-google-icon {
  margin-left: auto;
}

.modern-review-date {
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
}

.modern-review-date i {
  color: #10b981;
  font-size: 12px;
}

[data-theme="dark"] .modern-review-date,
body.theme-dark .modern-review-date {
  color: #94a3b8;
}

/* 10. Section 8: Pre-footer Banner */
.modern-prefooter-section {
  padding: 60px 0 90px;
}

.modern-prefooter-box {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 28px;
  padding: 48px;
  color: #ffffff;
  overflow: hidden;
  box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.4);
}

.modern-prefooter-ambient {
  position: absolute;
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, transparent 70%);
  pointer-events: none;
}

.modern-prefooter-title {
  font-size: clamp(1.75rem, 2.5vw, 2.3rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.modern-prefooter-desc {
  font-size: 1.05rem;
  color: #94a3b8;
  margin: 0;
}

.modern-prefooter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-end;
}

@media (max-width: 991px) {
  .modern-prefooter-buttons {
    justify-content: center;
  }
}

.modern-btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff !important;
  font-size: 14.5px;
  font-weight: 700 !important;
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none !important;
  box-shadow: 0 10px 20px -5px rgba(16, 185, 129, 0.4);
  transition: all 0.25s ease;
}

.modern-btn-whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 25px -5px rgba(16, 185, 129, 0.55);
}
`;

fs.appendFileSync('src/app/globals.css', cssToAppend, 'utf8');
console.log('Appended modern CSS successfully!');
