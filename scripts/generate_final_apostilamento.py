from PIL import Image, ImageDraw, ImageFont
import math

# Load original full image
im = Image.open('public/img/apostilamento-de-haia-orig.png').convert('RGBA')
w, h = im.size
print(f"Loaded image: {w}x{h}")

# ==========================================
# 1. UPDATE THE STAMP (SEAL)
# ==========================================
# In full image coordinates:
# Stamp crop was at offset (170, 160)
# Inside stamp crop, poly was: [(40, 52), (115, 74), (115, 83), (40, 61)]
# So in full image coordinates:
off_x, off_y = 170, 160
poly_full = [(x + off_x, y + off_y) for (x, y) in [(40, 52), (115, 74), (115, 83), (40, 61)]]

clear_mask = Image.new('RGBA', im.size, (0, 0, 0, 0))
mask_draw = ImageDraw.Draw(clear_mask)
mask_draw.polygon(poly_full, fill=(255, 255, 255, 255))
im = Image.alpha_composite(im, clear_mask)

# High-resolution rendering of "TraduzTudo" with flanking lines
scale = 8
angle_deg = 16.35
cx_full = 77.5 + off_x  # 247.5
cy_full = 67.5 + off_y  # 227.5

canvas_w = int(120 * scale)
canvas_h = int(40 * scale)
txt_canvas = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
draw = ImageDraw.Draw(txt_canvas)

font_path = 'C:/Windows/Fonts/arialbi.ttf'
font_size = int(6.8 * scale)
font = ImageFont.truetype(font_path, font_size)

text = "TraduzTudo"
bbox = font.getbbox(text)
bw = bbox[2] - bbox[0]
bh = bbox[3] - bbox[1]

tx = (canvas_w - bw) / 2 - bbox[0]
ty = (canvas_h - bh) / 2 - bbox[1]

text_color = (26, 26, 24, 255)
line_color = (180, 180, 180, 255)

# Draw text
draw.text((tx, ty), text, font=font, fill=text_color)

# Draw flanking lines
line_y = int(ty + bh / 2 + 0.8 * scale)
line_len = int(12 * scale)
gap = int(3.5 * scale)

# Left flanking line
draw.line([(tx - gap - line_len, line_y), (tx - gap, line_y)], fill=line_color, width=int(0.9 * scale))
# Right flanking line
draw.line([(tx + bw + gap, line_y), (tx + bw + gap + line_len, line_y)], fill=line_color, width=int(0.9 * scale))

# Rotate by -angle_deg
rotated = txt_canvas.rotate(-angle_deg, resample=Image.Resampling.BICUBIC, expand=True)

# Downscale to 1x
small_w = int(rotated.width / scale)
small_h = int(rotated.height / scale)
rotated_small = rotated.resize((small_w, small_h), Image.Resampling.LANCZOS)

paste_x = int(cx_full - small_w / 2)
paste_y = int(cy_full - small_h / 2)

im.paste(rotated_small, (paste_x, paste_y), rotated_small)
print("Updated stamp with TraduzTudo")

# ==========================================
# 2. UPDATE "ETD" ON TOP HEADER OF CERTIFICATE
# ==========================================
# In full image, ETD is around x: 362 to 430, y: 44 to 90
# Angle is 30 degrees isometric (dy/dx = 0.577)
# Let's clear ETD with white polygon
etd_poly = [
    (364, 46),
    (430, 84),
    (430, 100),
    (364, 62)
]
etd_clear = Image.new('RGBA', im.size, (0, 0, 0, 0))
etd_draw = ImageDraw.Draw(etd_clear)
etd_draw.polygon(etd_poly, fill=(255, 255, 255, 255))
im = Image.alpha_composite(im, etd_clear)

# Render "TraduzTudo" or "TTD" in isometric 30-degree style
etd_scale = 8
etd_angle = 30.0
etd_cx = (364 + 430) / 2
etd_cy = (46 + 84 + 62 + 100) / 4

etd_cw = int(140 * etd_scale)
etd_ch = int(50 * etd_scale)
etd_canvas = Image.new('RGBA', (etd_cw, etd_ch), (0, 0, 0, 0))
etd_d = ImageDraw.Draw(etd_canvas)

etd_font_size = int(15 * etd_scale)
etd_font = ImageFont.truetype(font_path, etd_font_size)

etd_text = "TraduzTudo"
# Or let's see size: "TraduzTudo" in 10px or "TTD" in 16px
# "TTD" matches the original 3-letter "ETD" perfectly!
etd_text = "TTD"
etd_bbox = etd_font.getbbox(etd_text)
ebw = etd_bbox[2] - etd_bbox[0]
ebh = etd_bbox[3] - etd_bbox[1]

etx = (etd_cw - ebw) / 2 - etd_bbox[0]
ety = (etd_ch - ebh) / 2 - etd_bbox[1]

# Original ETD color is light gray: RGB (218, 222, 226)
etd_color = (212, 218, 222, 255)
etd_d.text((etx, ety), etd_text, font=etd_font, fill=etd_color)

# Three decorative lines to the right of TTD (matching the three horizontal lines in original)
line_x_start = etx + ebw + 8 * etd_scale
line_x_end = line_x_start + 24 * etd_scale
line_y1 = ety + int(ebh * 0.25)
line_y2 = ety + int(ebh * 0.55)
line_y3 = ety + int(ebh * 0.85)

line_w = int(2.2 * etd_scale)
etd_d.line([(line_x_start, line_y1), (line_x_end, line_y1)], fill=etd_color, width=line_w)
etd_d.line([(line_x_start, line_y2), (line_x_end, line_y2)], fill=etd_color, width=line_w)
etd_d.line([(line_x_start, line_y3), (line_x_end, line_y3)], fill=etd_color, width=line_w)

# Rotate by -30 degrees
etd_rotated = etd_canvas.rotate(-etd_angle, resample=Image.Resampling.BICUBIC, expand=True)
etd_small_w = int(etd_rotated.width / etd_scale)
etd_small_h = int(etd_rotated.height / etd_scale)
etd_rotated_small = etd_rotated.resize((etd_small_w, etd_small_h), Image.Resampling.LANCZOS)

etd_paste_x = int(etd_cx - etd_small_w / 2 + 10)
etd_paste_y = int(etd_cy - etd_small_h / 2)
im.paste(etd_rotated_small, (etd_paste_x, etd_paste_y), etd_rotated_small)
print("Updated top header with TTD")

# Save as final image
output_path = 'public/img/apostilamento-de-haia.png'
im.save(output_path, optimize=True)
print(f"Successfully generated {output_path}!")
