from PIL import Image, ImageDraw, ImageFont
import math

# Load cropped stamp
im = Image.open('public/img/stamp_crop.png').convert('RGBA')

# In stamp_crop coordinates:
# "eTraduções" is roughly from x: 45 to 110, y: 50 to 65.
# Let's inspect the area we need to clear (mask to pure white #ffffff)
# The white background of the stamp is (255, 255, 255)
# Let's create an oriented rectangle to wipe out "eTraduções" and its flanking lines
mask = Image.new('RGBA', im.size, (0, 0, 0, 0))
mask_draw = ImageDraw.Draw(mask)

# Baseline angle is approximately 14.8 degrees
# Let's define the center of the text area in stamp_crop:
cx, cy = 76, 58
angle = 14.75

# Width of area to clear: from x=40 to x=112 -> width ~ 75, height ~ 16
# Let's create a polygon rotated by angle
rad = math.radians(angle)
cos_a = math.cos(rad)
sin_a = math.sin(rad)

def rotate_pt(x, y, cx, cy):
    dx = x - cx
    dy = y - cy
    rx = dx * cos_a - dy * sin_a + cx
    ry = dx * sin_a + dy * cos_a + cy
    return (rx, ry)

# Box before rotation: [-38, -8] to [38, 8] around cx, cy
corners = [
    rotate_pt(cx - 38, cy - 7, cx, cy),
    rotate_pt(cx + 38, cy - 7, cx, cy),
    rotate_pt(cx + 38, cy + 9, cx, cy),
    rotate_pt(cx - 38, cy + 9, cx, cy)
]

# Wipe with white
mask_draw.polygon(corners, fill=(255, 255, 255, 255))
im_cleared = Image.alpha_composite(im, mask)

# Now render "TraduzTudo"
# To get high quality antialiased rotated text, render at 4x resolution then downscale!
scale = 4
txt_w = int(120 * scale)
txt_h = int(40 * scale)
txt_img = Image.new('RGBA', (txt_w, txt_h), (0, 0, 0, 0))
txt_draw = ImageDraw.Draw(txt_img)

font_path = 'C:/Windows/Fonts/arialbi.ttf'
font_size = int(8.2 * scale)
font = ImageFont.truetype(font_path, font_size)

text = "TraduzTudo"
bbox = font.getbbox(text)
bw = bbox[2] - bbox[0]
bh = bbox[3] - bbox[1]

# Center text in txt_img
tx = (txt_w - bw) / 2 - bbox[0]
ty = (txt_h - bh) / 2 - bbox[1]

text_color = (26, 26, 24, 255)
line_color = (180, 180, 180, 255)

txt_draw.text((tx, ty), text, font=font, fill=text_color)

# Draw flanking lines
line_y = ty + bh / 2 + 1 * scale
line_len = 14 * scale
gap = 3.5 * scale

# Left line
txt_draw.line([(tx - gap - line_len, line_y), (tx - gap, line_y)], fill=line_color, width=int(0.8 * scale))
# Right line
txt_draw.line([(tx + bw + gap, line_y), (tx + bw + gap + line_len, line_y)], fill=line_color, width=int(0.8 * scale))

# Rotate txt_img by -angle (PIL rotates counter-clockwise, so -14.75 is clockwise)
rotated_txt = txt_img.rotate(-angle, resample=Image.Resampling.BICUBIC, expand=True)

# Downscale by scale
new_size = (int(rotated_txt.width / scale), int(rotated_txt.height / scale))
rotated_txt_small = rotated_txt.resize(new_size, Image.Resampling.LANCZOS)

# Paste centered at cx, cy
px = int(cx - rotated_txt_small.width / 2)
py = int(cy - rotated_txt_small.height / 2)

im_cleared.paste(rotated_txt_small, (px, py), rotated_txt_small)
im_cleared.save('public/img/stamp_test.png')
print("Saved stamp_test.png at position", px, py)
