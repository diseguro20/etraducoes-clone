from PIL import Image, ImageDraw, ImageFont
import math

# Load cropped stamp
im = Image.open('public/img/stamp_crop.png').convert('RGBA')

# Clear eTraduções with pure white
# Polygon coordinates
poly = [(40, 52), (115, 74), (115, 83), (40, 61)]
clear_mask = Image.new('RGBA', im.size, (0, 0, 0, 0))
mask_draw = ImageDraw.Draw(clear_mask)
mask_draw.polygon(poly, fill=(255, 255, 255, 255))
im_cleared = Image.alpha_composite(im, clear_mask)

# High-resolution rendering (8x)
scale = 8
angle_deg = 16.35

# Box center in stamp_crop:
cx = 77.5
cy = 67.5

canvas_w = int(120 * scale)
canvas_h = int(40 * scale)
txt_canvas = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
draw = ImageDraw.Draw(txt_canvas)

font_path = 'C:/Windows/Fonts/arialbi.ttf'
# In original, eTraduções is approx 6.5px high
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

# Rotate by -angle_deg (PIL rotates counter-clockwise, so -16.35 tilts down-right)
rotated = txt_canvas.rotate(-angle_deg, resample=Image.Resampling.BICUBIC, expand=True)

# Downscale to 1x
small_w = int(rotated.width / scale)
small_h = int(rotated.height / scale)
rotated_small = rotated.resize((small_w, small_h), Image.Resampling.LANCZOS)

# Paste centered at cx, cy
paste_x = int(cx - small_w / 2)
paste_y = int(cy - small_h / 2)

im_cleared.paste(rotated_small, (paste_x, paste_y), rotated_small)
im_cleared.save('public/img/stamp_traduztudo_crop.png')
print(f"Saved stamp_traduztudo_crop.png at ({paste_x}, {paste_y})")
