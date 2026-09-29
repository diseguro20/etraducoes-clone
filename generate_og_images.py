import os
import resvg_py
from PIL import Image

def generate_banner_1200x630():
    svg = """<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bg-grad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#060e1a"/>
      <stop offset="45%" stop-color="#0b1e38"/>
      <stop offset="100%" stop-color="#102d56"/>
    </linearGradient>
    <radialGradient id="glow-1" cx="1050" cy="120" r="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2e7ec6" stop-opacity="0.32"/>
      <stop offset="70%" stop-color="#2e7ec6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-2" cx="150" cy="550" r="450" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.22"/>
      <stop offset="70%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>

    <!-- Emblem Gradients -->
    <linearGradient id="seal-grad" x1="16" y1="22" x2="34" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#2e7ec6"/>
      <stop offset="100%" stop-color="#1e40af"/>
    </linearGradient>
    <linearGradient id="doc-grad" x1="0" y1="2" x2="32" y2="42" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f0f7ff"/>
    </linearGradient>
    <linearGradient id="card-grad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-grad)"/>
  <rect width="1200" height="630" fill="url(#glow-1)"/>
  <rect width="1200" height="630" fill="url(#glow-2)"/>

  <!-- Border Frame -->
  <rect x="24" y="24" width="1152" height="582" rx="20" fill="none" stroke="#38bdf8" stroke-opacity="0.2" stroke-width="1.5"/>

  <!-- Decorative Watermark Seal Right Side -->
  <g transform="translate(780, 70)" opacity="0.07">
    <circle cx="200" cy="200" r="190" stroke="#38bdf8" stroke-width="6" stroke-dasharray="12 8" fill="none"/>
    <circle cx="200" cy="200" r="165" stroke="#ffffff" stroke-width="3" fill="none"/>
    <circle cx="200" cy="200" r="140" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6 6" fill="none"/>
    <polygon points="200,90 226,155 295,160 242,205 258,272 200,235 142,272 158,205 105,160 174,155" fill="#38bdf8"/>
  </g>

  <!-- HEADER: Logo & Emblems -->
  <g transform="translate(70, 65)">
    <!-- Document + Seal Icon (Enlarged) -->
    <g transform="scale(2)">
      <rect x="0" y="2" width="32" height="40" rx="5" fill="url(#doc-grad)" stroke="#2e7ec6" stroke-width="2"/>
      <path d="M22 2 L32 12 L22 12 Z" fill="#2e7ec6" opacity="0.25"/>
      <path d="M22 2 V10 C22 11.1 22.9 12 24 12 H32" stroke="#2e7ec6" stroke-width="1.8" fill="none"/>
      <line x1="6" y1="9" x2="16" y2="9" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="6" y1="15" x2="26" y2="15" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="6" y1="21" x2="18" y2="21" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Ribbon tails -->
      <path d="M22 36 L19 43 L23 41.5 L24 37" fill="#1e40af"/>
      <path d="M27 36 L30 43 L26 41.5 L25 37" fill="#2563eb"/>
      <!-- Seal Circle -->
      <circle cx="24.5" cy="30.5" r="8.5" fill="url(#seal-grad)" stroke="#ffffff" stroke-width="1.8"/>
      <!-- Star -->
      <polygon points="24.5,25.5 25.8,28.5 29,28.8 26.5,30.8 27.3,34 24.5,32.2 21.7,34 22.5,30.8 20,28.8 23.2,28.5" fill="#ffffff"/>
    </g>

    <!-- Typography Logo -->
    <text x="86" y="52" font-family="Segoe UI, -apple-system, sans-serif" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="-1">Traduz<tspan fill="#38bdf8">Tudo</tspan></text>
    <text x="88" y="76" font-family="Segoe UI, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="#93c5fd">TRADUÇÕES JURAMENTADAS &amp; CERTIFICADAS</text>

    <!-- Official Badge -->
    <g transform="translate(680, 16)">
      <rect x="0" y="0" width="310" height="46" rx="23" fill="#38bdf8" fill-opacity="0.12" stroke="#38bdf8" stroke-opacity="0.4" stroke-width="1.5"/>
      <circle cx="24" cy="23" r="10" fill="#38bdf8"/>
      <path d="M19 23 L22 26 L29 19" stroke="#0b1e38" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <text x="44" y="29" font-family="Segoe UI, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="1.2" fill="#e0f2fe">DOCUMENTOS OFICIAIS</text>
    </g>
  </g>

  <!-- BODY CONTENT -->
  <g transform="translate(70, 205)">
    <!-- Main Headline -->
    <text x="0" y="46" font-family="Segoe UI, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="-0.5">Traduções Juramentadas com</text>
    <text x="0" y="100" font-family="Segoe UI, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#38bdf8" letter-spacing="-0.5">Validade Oficial em +190 Países</text>

    <!-- Subtitle / Value Prop -->
    <text x="0" y="146" font-family="Segoe UI, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#94a3b8">Aceitas em consulados, embaixadas, universidades, imigração e órgãos públicos.</text>
    <text x="0" y="174" font-family="Segoe UI, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#94a3b8">Tradutores públicos oficiais matriculados na Junta Comercial com carimbo e assinatura digital.</text>

    <!-- 4 Value Pills -->
    <g transform="translate(0, 208)">
      <!-- Pill 1 -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="235" height="48" rx="12" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1"/>
        <circle cx="22" cy="24" r="8" fill="#38bdf8"/>
        <path d="M18 24 L21 27 L26 21" stroke="#07111e" stroke-width="2" stroke-linecap="round" fill="none"/>
        <text x="38" y="29" font-family="Segoe UI, -apple-system, sans-serif" font-size="14.5" font-weight="600" fill="#f1f5f9">Apostilamento de Haia</text>
      </g>

      <!-- Pill 2 -->
      <g transform="translate(250, 0)">
        <rect x="0" y="0" width="260" height="48" rx="12" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1"/>
        <circle cx="22" cy="24" r="8" fill="#38bdf8"/>
        <path d="M18 24 L21 27 L26 21" stroke="#07111e" stroke-width="2" stroke-linecap="round" fill="none"/>
        <text x="38" y="29" font-family="Segoe UI, -apple-system, sans-serif" font-size="14.5" font-weight="600" fill="#f1f5f9">Tradutores Concursados</text>
      </g>

      <!-- Pill 3 -->
      <g transform="translate(525, 0)">
        <rect x="0" y="0" width="245" height="48" rx="12" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1"/>
        <circle cx="22" cy="24" r="8" fill="#38bdf8"/>
        <path d="M18 24 L21 27 L26 21" stroke="#07111e" stroke-width="2" stroke-linecap="round" fill="none"/>
        <text x="38" y="29" font-family="Segoe UI, -apple-system, sans-serif" font-size="14.5" font-weight="600" fill="#f1f5f9">Mais de 15 Idiomas</text>
      </g>

      <!-- Pill 4 -->
      <g transform="translate(785, 0)">
        <rect x="0" y="0" width="270" height="48" rx="12" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1"/>
        <circle cx="22" cy="24" r="8" fill="#38bdf8"/>
        <path d="M18 24 L21 27 L26 21" stroke="#07111e" stroke-width="2" stroke-linecap="round" fill="none"/>
        <text x="38" y="29" font-family="Segoe UI, -apple-system, sans-serif" font-size="14.5" font-weight="600" fill="#f1f5f9">Assinatura ICP-Brasil</text>
      </g>
    </g>
  </g>

  <!-- FOOTER BAR: WhatsApp & Link -->
  <g transform="translate(70, 515)">
    <!-- Divider Line -->
    <line x1="0" y1="0" x2="1060" y2="0" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1"/>

    <!-- WhatsApp Box -->
    <g transform="translate(0, 18)">
      <!-- WhatsApp Badge -->
      <rect x="0" y="0" width="340" height="52" rx="26" fill="#25d366" fill-opacity="0.16" stroke="#25d366" stroke-width="1.5"/>
      <!-- WhatsApp Icon -->
      <circle cx="26" cy="26" r="18" fill="#25d366"/>
      <path d="M26 15 C19.92 15 15 19.92 15 26 C15 28.18 15.63 30.22 16.73 31.94 L15.5 36.5 L20.21 35.26 C21.87 36.27 23.86 36.85 26 36.85 C32.08 36.85 37 31.93 37 25.85 C37 19.77 32.08 15 26 15 Z" fill="#ffffff"/>
      <path d="M26 17 C21.03 17 17 21.03 17 26 C17 27.79 17.52 29.46 18.42 30.87 L17.5 34.3 L21.04 33.37 C22.4 34.2 24.13 34.7 26 34.7 C30.97 34.7 35 30.67 35 25.7 C35 20.73 30.97 17 26 17 Z" fill="#25d366"/>
      <path d="M29.2 28.8 C28.9 29.5 27.8 30.1 27.1 30.2 C26.5 30.3 25.7 30.3 23.4 29.3 C20.5 28.1 18.6 25.1 18.5 24.9 C18.3 24.7 17.3 23.4 17.3 22 C17.3 20.6 18 19.9 18.3 19.6 C18.5 19.4 18.8 19.3 19.1 19.3 C19.3 19.3 19.6 19.3 19.8 19.8 C20.1 20.4 20.6 21.8 20.7 22 C20.8 22.2 20.8 22.4 20.6 22.6 C20.5 22.8 20.3 23 20.2 23.2 C20 23.4 19.9 23.6 20.1 23.9 C20.3 24.2 21 25.4 22.1 26.3 C23.4 27.5 24.5 27.8 24.9 28 C25.2 28.1 25.5 28.1 25.7 27.9 C25.9 27.6 26.5 26.9 26.7 26.6 C26.9 26.3 27.1 26.3 27.4 26.4 C27.7 26.5 29.3 27.3 29.6 27.5 C29.9 27.6 30.1 27.7 30.2 27.9 C30.2 28.1 30.2 28.6 29.2 28.8 Z" fill="#ffffff"/>
      <text x="56" y="23" font-family="Segoe UI, -apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="1" fill="#4ade80">WHATSAPP OFICIAL</text>
      <text x="56" y="42" font-family="Segoe UI, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#ffffff">(11) 98285-4183</text>
    </g>

    <!-- Platform Domain -->
    <g transform="translate(800, 26)">
      <text x="0" y="24" font-family="Segoe UI, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#38bdf8" letter-spacing="0.5">traduztudo.vercel.app</text>
      <!-- Arrow -->
      <path d="M245 16 L257 16 M252 11 L257 16 L252 21" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </g>
  </g>
</svg>"""
    return svg

def generate_square_600x600():
    svg = """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg-grad-sq" x1="0" y1="0" x2="600" y2="600" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#060e1a"/>
      <stop offset="50%" stop-color="#0b1e38"/>
      <stop offset="100%" stop-color="#102d56"/>
    </linearGradient>
    <radialGradient id="glow-sq" cx="300" cy="220" r="300" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2e7ec6" stop-opacity="0.38"/>
      <stop offset="70%" stop-color="#2e7ec6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="seal-grad-sq" x1="16" y1="22" x2="34" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#2e7ec6"/>
      <stop offset="100%" stop-color="#1e40af"/>
    </linearGradient>
    <linearGradient id="doc-grad-sq" x1="0" y1="2" x2="32" y2="42" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f0f7ff"/>
    </linearGradient>
  </defs>

  <rect width="600" height="600" fill="url(#bg-grad-sq)"/>
  <rect width="600" height="600" fill="url(#glow-sq)"/>
  <rect x="20" y="20" width="560" height="560" rx="28" fill="none" stroke="#38bdf8" stroke-opacity="0.25" stroke-width="2"/>

  <!-- Watermark Star Seal -->
  <g transform="translate(150, 60)" opacity="0.08">
    <circle cx="150" cy="150" r="140" stroke="#38bdf8" stroke-width="4" stroke-dasharray="8 6" fill="none"/>
    <circle cx="150" cy="150" r="120" stroke="#ffffff" stroke-width="2" fill="none"/>
    <polygon points="150,60 170,115 228,118 182,154 196,210 150,180 104,210 118,154 72,118 130,115" fill="#38bdf8"/>
  </g>

  <!-- Large Centered Emblem -->
  <g transform="translate(230, 75) scale(3.5)">
    <rect x="0" y="2" width="32" height="40" rx="5" fill="url(#doc-grad-sq)" stroke="#2e7ec6" stroke-width="1.8"/>
    <path d="M22 2 L32 12 L22 12 Z" fill="#2e7ec6" opacity="0.25"/>
    <path d="M22 2 V10 C22 11.1 22.9 12 24 12 H32" stroke="#2e7ec6" stroke-width="1.6" fill="none"/>
    <line x1="6" y1="9" x2="16" y2="9" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>
    <line x1="6" y1="15" x2="26" y2="15" stroke="#cbd5e1" stroke-width="1.6" stroke-linecap="round"/>
    <line x1="6" y1="21" x2="18" y2="21" stroke="#cbd5e1" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M22 36 L19 43 L23 41.5 L24 37" fill="#1e40af"/>
    <path d="M27 36 L30 43 L26 41.5 L25 37" fill="#2563eb"/>
    <circle cx="24.5" cy="30.5" r="8.5" fill="url(#seal-grad-sq)" stroke="#ffffff" stroke-width="1.6"/>
    <polygon points="24.5,25.5 25.8,28.5 29,28.8 26.5,30.8 27.3,34 24.5,32.2 21.7,34 22.5,30.8 20,28.8 23.2,28.5" fill="#ffffff"/>
  </g>

  <!-- Centered Brand Title -->
  <text x="300" y="280" text-anchor="middle" font-family="Segoe UI, -apple-system, sans-serif" font-size="54" font-weight="900" fill="#ffffff" letter-spacing="-1">Traduz<tspan fill="#38bdf8">Tudo</tspan></text>
  <text x="300" y="310" text-anchor="middle" font-family="Segoe UI, -apple-system, sans-serif" font-size="14.5" font-weight="700" letter-spacing="3.5" fill="#93c5fd">TRADUÇÕES JURAMENTADAS</text>
  <text x="300" y="332" text-anchor="middle" font-family="Segoe UI, -apple-system, sans-serif" font-size="13" font-weight="600" letter-spacing="2" fill="#60a5fa">&amp; CERTIFICADAS OFICIAIS</text>

  <!-- Badge Pill -->
  <g transform="translate(130, 360)">
    <rect x="0" y="0" width="340" height="42" rx="21" fill="#38bdf8" fill-opacity="0.12" stroke="#38bdf8" stroke-opacity="0.35" stroke-width="1.5"/>
    <text x="170" y="26" text-anchor="middle" font-family="Segoe UI, -apple-system, sans-serif" font-size="13.5" font-weight="700" letter-spacing="1" fill="#e0f2fe">✓ VALIDADE EM MAIS DE 190 PAÍSES</text>
  </g>

  <!-- WhatsApp Button -->
  <g transform="translate(130, 424)">
    <rect x="0" y="0" width="340" height="56" rx="28" fill="#25d366" fill-opacity="0.2" stroke="#25d366" stroke-width="2"/>
    <circle cx="36" cy="28" r="18" fill="#25d366"/>
    <path d="M36 17 C29.92 17 25 21.92 25 28 C25 30.18 25.63 32.22 26.73 33.94 L25.5 38.5 L30.21 37.26 C31.87 38.27 33.86 38.85 36 38.85 C42.08 38.85 47 33.93 47 27.85 C47 21.77 42.08 17 36 17 Z" fill="#ffffff"/>
    <path d="M36 19 C31.03 19 27 23.03 27 28 C27 29.79 27.52 31.46 28.42 32.87 L27.5 36.3 L31.04 35.37 C32.4 36.2 34.13 36.7 36 36.7 C40.97 36.7 45 32.67 45 27.7 C45 22.73 40.97 19 36 19 Z" fill="#25d366"/>
    <text x="70" y="25" font-family="Segoe UI, -apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="1" fill="#4ade80">WHATSAPP OFICIAL</text>
    <text x="70" y="44" font-family="Segoe UI, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#ffffff">(11) 98285-4183</text>
  </g>

  <!-- Domain -->
  <text x="300" y="525" text-anchor="middle" font-family="Segoe UI, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#38bdf8" letter-spacing="0.5">traduztudo.vercel.app</text>
</svg>"""
    return svg

def main():
    os.makedirs('public/img', exist_ok=True)
    os.makedirs('src/app', exist_ok=True)
    
    # 1. Generate horizontal banner (1200x630)
    svg_banner = generate_banner_1200x630()
    with open('public/img/og-preview.svg', 'w', encoding='utf-8') as f:
        f.write(svg_banner)
    
    png_banner_bytes = resvg_py.svg_to_bytes(
        svg_string=svg_banner,
        font_files=['C:/Windows/Fonts/segoeui.ttf', 'C:/Windows/Fonts/segoeuib.ttf', 'C:/Windows/Fonts/arial.ttf', 'C:/Windows/Fonts/arialbd.ttf']
    )
    with open('public/img/og-preview.png', 'wb') as f:
        f.write(png_banner_bytes)
    # Also save as og-image.png and to src/app/opengraph-image.png & src/app/twitter-image.png
    with open('public/img/og-image.png', 'wb') as f:
        f.write(png_banner_bytes)
    with open('src/app/opengraph-image.png', 'wb') as f:
        f.write(png_banner_bytes)
    with open('src/app/twitter-image.png', 'wb') as f:
        f.write(png_banner_bytes)
    print("Banner (1200x630) written:", len(png_banner_bytes), "bytes")

    # 2. Generate square banner (600x600)
    svg_sq = generate_square_600x600()
    with open('public/img/og-square.svg', 'w', encoding='utf-8') as f:
        f.write(svg_sq)
        
    png_sq_bytes = resvg_py.svg_to_bytes(
        svg_string=svg_sq,
        font_files=['C:/Windows/Fonts/segoeui.ttf', 'C:/Windows/Fonts/segoeuib.ttf', 'C:/Windows/Fonts/arial.ttf', 'C:/Windows/Fonts/arialbd.ttf']
    )
    with open('public/img/og-square.png', 'wb') as f:
        f.write(png_sq_bytes)
    with open('public/img/whatsapp-preview.png', 'wb') as f:
        f.write(png_sq_bytes)
    print("Square (600x600) written:", len(png_sq_bytes), "bytes")

    # 3. Generate apple-touch-icon.png (180x180) from square
    im = Image.open('public/img/og-square.png')
    im_touch = im.resize((180, 180), Image.Resampling.LANCZOS)
    im_touch.save('public/apple-touch-icon.png', 'PNG')
    im_touch.save('src/app/apple-icon.png', 'PNG')
    print("Apple touch icon (180x180) written")

if __name__ == '__main__':
    main()
