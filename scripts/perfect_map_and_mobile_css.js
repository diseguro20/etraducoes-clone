const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const cssFile = path.join(projectRoot, 'src/app/globals.css');
let cssContent = fs.readFileSync(cssFile, 'utf8');

// Find where our custom map block starts
const mapStartIdx = cssContent.indexOf('/* ==============================================\n   MAP WITH COUNTRY FLAGS - Restored');

if (mapStartIdx === -1) {
  console.log('[ERROR] Could not find map start block in globals.css');
  process.exit(1);
}

// Slice out the old temporary rules
cssContent = cssContent.substring(0, mapStartIdx);

// Append the perfected, robust and complete Map + Mobile Compactness CSS
const perfectedCSS = `/* ==============================================
   MAP WITH COUNTRY FLAGS - Restored & 100% Responsive
   ============================================== */

.traduztudo-map-viewport {
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 32px auto 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  box-sizing: border-box;
}

.traduztudo-map-stage {
  position: relative;
  width: 873px;
  height: 440px;
  margin: 25px auto 10px;
  flex-shrink: 0;
  transform-origin: top center;
}

.traduztudo-map-stage img.traduztudo-map-base {
  position: absolute;
  top: 20px;
  left: 0;
  width: 873px;
  height: 401px;
  display: block;
  pointer-events: none;
  z-index: 1;
}

[data-theme="dark"] .traduztudo-map-stage img.traduztudo-map-base,
body.theme-dark .traduztudo-map-stage img.traduztudo-map-base {
  opacity: 0.45;
  filter: brightness(1.2) drop-shadow(0 0 10px rgba(56, 189, 248, 0.15));
}

/* Flag pins on top of the map */
.traduztudo-map-stage a {
  position: absolute !important;
  z-index: 5 !important;
  display: block !important;
  width: 52px !important;
  height: 52px !important;
  text-decoration: none !important;
  outline: none !important;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0.2s ease !important;
}

.traduztudo-map-stage a:hover {
  transform: scale(1.25) translateY(-2px) !important;
  z-index: 20 !important;
}

.traduztudo-map-stage a img {
  width: 52px !important;
  height: 52px !important;
  border: 2px solid #ffffff !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2) !important;
  display: block !important;
  background-color: #ffffff !important;
}

[data-theme="dark"] .traduztudo-map-stage a img,
body.theme-dark .traduztudo-map-stage a img {
  border-color: #0f172a !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6) !important;
}

/* Original Pin Coordinates calibrated with pixel-precision over 873x440 canvas (20px top offset) */
.traduztudo-map-stage a.arg { left: 180px !important; top: 364px !important; }
.traduztudo-map-stage a.br  { left: 256px !important; top: 304px !important; }
.traduztudo-map-stage a.ca  { left: 191px !important; top: 109px !important; }
.traduztudo-map-stage a.eua { left: 167px !important; top: 169px !important; }
.traduztudo-map-stage a.spa { left: 383px !important; top: 126px !important; }
.traduztudo-map-stage a.no  { left: 474px !important; top: -11px !important; }
.traduztudo-map-stage a.uk  { left: 394px !important; top: 19px !important; }
.traduztudo-map-stage a.fr  { left: 400px !important; top: 74px !important; }
.traduztudo-map-stage a.nl  { left: 446px !important; top: 14px !important; width: 34px !important; height: 34px !important; }
.traduztudo-map-stage a.nl img { width: 34px !important; height: 34px !important; }
.traduztudo-map-stage a.de  { left: 457px !important; top: 64px !important; }
.traduztudo-map-stage a.ita { left: 457px !important; top: 134px !important; }
.traduztudo-map-stage a.rus { left: 623px !important; top: 84px !important; }
.traduztudo-map-stage a.ch  { left: 639px !important; top: 194px !important; }
.traduztudo-map-stage a.au  { left: 765px !important; top: 334px !important; }
.traduztudo-map-stage a.ko  { left: 660px !important; top: 174px !important; }
.traduztudo-map-stage a.ja  { left: 736px !important; top: 194px !important; }
.traduztudo-map-stage a.ar  { left: 472px !important; top: 194px !important; }
.traduztudo-map-stage a.he  { left: 437px !important; top: 174px !important; width: 34px !important; height: 34px !important; }
.traduztudo-map-stage a.he img { width: 34px !important; height: 34px !important; }

/* Glowing pulse effect on flag pins */
.shadow-pulse {
  animation: shadowPulseGlow 2.5s infinite ease-in-out !important;
}

@keyframes shadowPulseGlow {
  0% {
    box-shadow: 0 0 0 0 rgba(46, 126, 198, 0.6);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(46, 126, 198, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(46, 126, 198, 0);
  }
}

/* Map responsive scaling for laptops, tablets and mobiles */
@media (min-width: 1024px) and (max-width: 1200px) {
  .traduztudo-map-stage {
    transform: scale(0.88);
    margin-bottom: -50px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .traduztudo-map-stage {
    transform: scale(0.72);
    margin-bottom: -115px;
  }
}

@media (min-width: 480px) and (max-width: 767px) {
  .traduztudo-map-stage {
    transform: scale(0.50);
    margin-bottom: -210px;
  }
}

@media (max-width: 479px) {
  .traduztudo-map-stage {
    transform: scale(0.40);
    margin-bottom: -255px;
  }
}

@media (max-width: 360px) {
  .traduztudo-map-stage {
    transform: scale(0.35);
    margin-bottom: -280px;
  }
}

/* =========================================================
   COMPACT & MOBILE-PERFECT OPTIMIZATIONS (Site-Wide)
   ========================================================= */

/* Mobile Header: Sleek & Compact (56px) */
@media (max-width: 767px) {
  .modern-site-header,
  header.container-s {
    height: 56px !important;
  }

  .modern-header-inner {
    height: 56px !important;
    padding: 0 14px !important;
  }

  .modern-header-brand img {
    height: 28px !important;
    max-width: 145px !important;
  }

  .modern-mobile-drawer {
    top: 56px !important;
    height: calc(100vh - 56px) !important;
    padding: 16px 16px 32px !important;
    gap: 14px !important;
  }
}

/* Mobile Hero Section: Compact, Modern & High-Converting */
@media (max-width: 767px) {
  .modern-hero-section {
    padding: 16px 0 24px !important;
  }

  .modern-hero-ambient {
    height: 400px !important;
    top: -150px !important;
    opacity: 0.7 !important;
  }

  .modern-hero-grid {
    gap: 18px !important;
  }

  .modern-hero-badge {
    margin-bottom: 10px !important;
    padding: 4px 10px !important;
  }

  .modern-badge-text {
    font-size: 9.5px !important;
    letter-spacing: 0.04em !important;
  }

  .modern-hero-title {
    font-size: 1.62rem !important;
    line-height: 1.18 !important;
    margin-bottom: 10px !important;
    letter-spacing: -0.02em !important;
  }

  .modern-hero-desc {
    font-size: 0.88rem !important;
    line-height: 1.42 !important;
    margin-bottom: 12px !important;
    color: var(--color-secundary, #475569) !important;
  }

  .modern-hero-features {
    gap: 6px !important;
    margin-bottom: 14px !important;
    flex-wrap: wrap !important;
  }

  .modern-feature-tag {
    font-size: 10.5px !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
  }

  .modern-hero-actions {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    margin-bottom: 14px !important;
  }

  .modern-hero-actions .modern-btn-primary,
  .modern-hero-actions .modern-btn-secondary {
    width: 100% !important;
    justify-content: center !important;
    text-align: center !important;
    padding: 11px 14px !important;
    font-size: 13.5px !important;
    border-radius: 10px !important;
    min-height: 44px !important;
    box-sizing: border-box !important;
  }

  /* Compact Trust Strip (4 items in 2x2 grid or sleek row) */
  .modern-hero-stats {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 6px !important;
    margin-top: 12px !important;
    padding: 10px 12px !important;
    background: rgba(0, 0, 0, 0.02) !important;
    border: 1px solid rgba(0, 0, 0, 0.05) !important;
    border-radius: 12px !important;
  }

  [data-theme="dark"] .modern-hero-stats,
  body.theme-dark .modern-hero-stats {
    background: rgba(255, 255, 255, 0.03) !important;
    border-color: rgba(255, 255, 255, 0.08) !important;
  }

  .modern-stat-item {
    padding: 4px 6px !important;
    border: none !important;
    text-align: center !important;
  }

  .modern-stat-num {
    font-size: 0.95rem !important;
    font-weight: 800 !important;
    margin-bottom: 2px !important;
  }

  .modern-stat-label {
    font-size: 9.5px !important;
    line-height: 1.15 !important;
    opacity: 0.8 !important;
  }

  /* Compact Quote Form Card on Mobile */
  .modern-form-card {
    padding: 16px 14px !important;
    border-radius: 14px !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06) !important;
  }

  .modern-form-header {
    margin-bottom: 12px !important;
    text-align: left !important;
  }

  .modern-form-header-badge {
    font-size: 9.5px !important;
    padding: 3px 8px !important;
    margin-bottom: 6px !important;
  }

  .modern-form-title {
    font-size: 1.15rem !important;
    margin-bottom: 4px !important;
  }

  .modern-form-subtitle {
    font-size: 0.8rem !important;
    line-height: 1.35 !important;
    margin-bottom: 8px !important;
  }

  .modern-form-row {
    grid-template-columns: 1fr !important;
    gap: 8px !important;
    margin-bottom: 0 !important;
  }

  .modern-input-group {
    margin-bottom: 8px !important;
  }

  .modern-input-label {
    font-size: 11.5px !important;
    margin-bottom: 3px !important;
    font-weight: 600 !important;
  }

  .modern-input-field {
    height: 40px !important;
    padding: 0 10px !important;
    font-size: 13.5px !important;
    border-radius: 8px !important;
  }

  .modern-select-field {
    height: 40px !important;
    padding-right: 30px !important;
    font-size: 13px !important;
  }

  .modern-dropzone-compact {
    padding: 10px 12px !important;
    border-radius: 8px !important;
    gap: 8px !important;
  }

  .modern-dropzone-icon {
    font-size: 18px !important;
  }

  .modern-dropzone-info strong {
    font-size: 11.5px !important;
    display: block !important;
  }

  .modern-dropzone-info span {
    font-size: 9.5px !important;
  }

  .modern-submit-btn {
    height: 44px !important;
    padding: 0 16px !important;
    font-size: 13.5px !important;
    font-weight: 700 !important;
    border-radius: 10px !important;
    margin-top: 6px !important;
  }

  .modern-security-note {
    font-size: 10px !important;
    margin-top: 8px !important;
    line-height: 1.35 !important;
  }
}

/* Mobile Guarantees & Network Section: 2x2 Grid */
@media (max-width: 767px) {
  .modern-network-section {
    padding: 28px 0 !important;
  }

  .modern-section-header {
    margin-bottom: 18px !important;
  }

  .modern-section-badge {
    font-size: 9.5px !important;
    padding: 3px 8px !important;
    margin-bottom: 6px !important;
  }

  .modern-section-title {
    font-size: 1.35rem !important;
    line-height: 1.25 !important;
    margin-bottom: 6px !important;
  }

  .modern-section-desc {
    font-size: 0.82rem !important;
    line-height: 1.4 !important;
    max-width: 90% !important;
    margin: 0 auto !important;
  }

  .modern-guarantees-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 8px !important;
    margin-bottom: 20px !important;
  }

  .modern-guarantee-card {
    padding: 12px 10px !important;
    border-radius: 10px !important;
    text-align: center !important;
  }

  .modern-guarantee-icon {
    width: 34px !important;
    height: 34px !important;
    font-size: 15px !important;
    margin: 0 auto 8px !important;
  }

  .modern-guarantee-card h3 {
    font-size: 0.82rem !important;
    font-weight: 700 !important;
    margin-bottom: 4px !important;
  }

  .modern-guarantee-card p {
    font-size: 0.72rem !important;
    line-height: 1.35 !important;
    margin: 0 !important;
    opacity: 0.85 !important;
  }

  /* Language Chips underneath map */
  .modern-network-hub {
    margin-top: 14px !important;
    padding: 14px 10px !important;
    border-radius: 12px !important;
  }

  .modern-network-hub-header {
    font-size: 10px !important;
    margin-bottom: 10px !important;
  }

  .modern-lang-chips {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 6px !important;
  }

  .modern-lang-chip {
    padding: 6px 8px !important;
    border-radius: 8px !important;
    gap: 6px !important;
  }

  .modern-lang-chip img {
    width: 18px !important;
    height: 18px !important;
  }

  .modern-lang-chip strong {
    font-size: 11.5px !important;
    line-height: 1.15 !important;
  }

  .modern-lang-chip span {
    font-size: 9px !important;
  }
}

/* Mobile Steps Section: 2x2 Grid (Passos 1 a 4) */
@media (max-width: 767px) {
  .modern-steps-section {
    padding: 28px 0 !important;
  }

  .modern-steps-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 8px !important;
  }

  .modern-step-card {
    padding: 14px 10px !important;
    border-radius: 10px !important;
  }

  .modern-step-number {
    font-size: 1.4rem !important;
    top: 6px !important;
    right: 8px !important;
    opacity: 0.12 !important;
  }

  .modern-step-icon {
    width: 32px !important;
    height: 32px !important;
    font-size: 14px !important;
    margin-bottom: 8px !important;
  }

  .modern-step-card h3 {
    font-size: 0.84rem !important;
    margin-bottom: 4px !important;
  }

  .modern-step-card p {
    font-size: 0.72rem !important;
    line-height: 1.35 !important;
    margin: 0 !important;
  }
}

/* Mobile Apostille Section */
@media (max-width: 767px) {
  .modern-apostille-section {
    padding: 24px 0 !important;
  }

  .modern-apostille-card {
    padding: 20px 14px !important;
    border-radius: 14px !important;
  }

  .modern-apostille-img {
    max-width: 220px !important;
    height: auto !important;
    margin: 0 auto 14px !important;
  }

  .modern-apostille-title {
    font-size: 1.25rem !important;
    line-height: 1.25 !important;
    margin-bottom: 8px !important;
  }

  .modern-apostille-desc {
    font-size: 0.82rem !important;
    line-height: 1.4 !important;
    margin-bottom: 12px !important;
  }

  .modern-apostille-checklist {
    gap: 6px !important;
    margin-bottom: 14px !important;
  }

  .modern-check-item {
    font-size: 0.78rem !important;
    gap: 6px !important;
  }

  .modern-check-item i {
    font-size: 12px !important;
  }

  .modern-apostille-actions {
    flex-direction: column !important;
    gap: 8px !important;
  }

  .modern-apostille-actions .modern-btn-primary,
  .modern-apostille-actions .modern-btn-secondary {
    width: 100% !important;
    justify-content: center !important;
    padding: 10px 14px !important;
    font-size: 13px !important;
  }
}

/* Mobile Document Categories (Quais Documentos Traduzimos) */
@media (max-width: 767px) {
  .modern-docs-section {
    padding: 28px 0 !important;
  }

  .modern-docs-section h3.title-sm {
    font-size: 1.1rem !important;
    margin-top: 24px !important;
    margin-bottom: 14px !important;
  }

  .type-content {
    padding: 16px 12px !important;
    margin-bottom: 10px !important;
    border-radius: 12px !important;
    text-align: center !important;
  }

  .type-content img {
    width: 42px !important;
    height: 42px !important;
    margin-bottom: 8px !important;
  }

  .type-content h4 {
    font-size: 0.95rem !important;
    margin-bottom: 4px !important;
  }

  .type-content p {
    font-size: 0.78rem !important;
    line-height: 1.35 !important;
    margin-bottom: 10px !important;
  }

  .type-content .btn {
    padding: 6px 14px !important;
    font-size: 11.5px !important;
    border-radius: 6px !important;
  }
}

/* Mobile Brian / WhatsApp Mockup Section */
@media (max-width: 767px) {
  .modern-brian-section {
    padding: 24px 0 !important;
  }

  .modern-phone-wrapper {
    margin-top: 14px !important;
    display: flex !important;
    justify-content: center !important;
  }

  .modern-phone-mockup {
    max-width: 220px !important;
    height: auto !important;
    border-radius: 16px !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
  }

  .modern-brian-points {
    gap: 6px !important;
    margin: 12px 0 !important;
  }

  .modern-brian-points li {
    font-size: 0.8rem !important;
  }

  .modern-brian-actions {
    flex-direction: column !important;
    gap: 8px !important;
  }

  .modern-brian-actions .modern-btn-primary,
  .modern-brian-actions .modern-btn-secondary {
    width: 100% !important;
    justify-content: center !important;
    padding: 10px 14px !important;
    font-size: 13px !important;
  }
}

/* Mobile Google Reviews Section */
@media (max-width: 767px) {
  .modern-reviews-section {
    padding: 28px 0 !important;
  }

  .modern-review-card {
    padding: 14px 12px !important;
    margin-bottom: 10px !important;
    border-radius: 12px !important;
  }

  .modern-review-top {
    gap: 8px !important;
    margin-bottom: 8px !important;
  }

  .ref-avatar {
    width: 36px !important;
    height: 36px !important;
  }

  .title-reference {
    font-size: 13px !important;
  }

  .ref-stars {
    font-size: 11px !important;
  }

  .ref-text {
    font-size: 0.8rem !important;
    line-height: 1.4 !important;
    margin-bottom: 8px !important;
  }

  .modern-review-date {
    font-size: 10.5px !important;
  }
}

/* Mobile Pre-Footer Banner */
@media (max-width: 767px) {
  .modern-prefooter-section {
    padding: 20px 0 28px !important;
  }

  .modern-prefooter-box {
    padding: 20px 14px !important;
    border-radius: 14px !important;
  }

  .modern-prefooter-title {
    font-size: 1.25rem !important;
    line-height: 1.25 !important;
    margin-bottom: 6px !important;
  }

  .modern-prefooter-desc {
    font-size: 0.8rem !important;
    line-height: 1.38 !important;
    margin-bottom: 14px !important;
  }

  .modern-prefooter-buttons {
    flex-direction: column !important;
    gap: 8px !important;
  }

  .modern-prefooter-buttons .modern-btn-primary,
  .modern-prefooter-buttons .modern-btn-whatsapp {
    width: 100% !important;
    justify-content: center !important;
    padding: 11px 16px !important;
    font-size: 13px !important;
  }
}

/* Global Anti-Overflow Guarantee */
html, body {
  overflow-x: hidden !important;
  max-width: 100vw !important;
  position: relative !important;
}

*, *::before, *::after {
  box-sizing: border-box;
}
`;

cssContent += perfectedCSS;
fs.writeFileSync(cssFile, cssContent, 'utf8');
console.log('[DONE] globals.css perfected and updated with responsive map & mobile compactness');
