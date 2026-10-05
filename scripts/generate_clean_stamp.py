from PIL import Image, ImageDraw, ImageFont
import math

# Load original pristine image
im = Image.open('public/img/apostilamento-de-haia-orig.png').convert('RGBA')
w, h = im.size
print(f"Original size: {w}x{h}")

# Stamp coordinates in original image:
# Stamp center is around (247.5, 227.5)
off_x, off_y = 170, 160
# Polygon to clear eTraduções and its flanking lines
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

canvas_w = int(130 * scale)
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

output_path = 'public/img/apostilamento-de-haia.png'
im.save(output_path, optimize=True)
print(f"Generated clean {output_path} successfully!")

# Also generate a close-up crop for verification
crop = im.crop((170, 160, 330, 275))
crop.save('public/img/stamp_final_crop.png')
print("Saved public/img/stamp_final_crop.png for verification")
