import os
from PIL import Image, ImageFont, ImageDraw
import numpy as np

# Load original crops
crop_link = Image.open('public/screenshots/link_only.png').convert('RGB')
crop_top = Image.open('public/screenshots/etrad_real_crop.png').convert('RGB')

fonts_to_test = [
    ('Catamaran-400', 'scripts/Catamaran-400.ttf'),
    ('Catamaran-500', 'scripts/Catamaran-500.ttf'),
    ('Roboto-Regular', 'scripts/Roboto-Regular.ttf'),
    ('Poppins-Regular', 'scripts/Poppins-Regular.ttf'),
    ('Montserrat-Regular', 'scripts/Montserrat-Regular.ttf'),
    ('OpenSans-Regular', 'scripts/OpenSans-Regular.ttf'),
    ('SegoeUI', 'C:\\Windows\\Fonts\\segoeui.ttf'),
    ('Arial', 'C:\\Windows\\Fonts\\arial.ttf'),
]

print("--- Testing 'da eTraduções.' width and height in original ---")
# In etrad_real_crop.png, let's find the dimensions of "da eTraduções."
# Recall etrad_real_crop was cropped from (230, 110, 480, 170)
# 'da eTraduções.' was at x=(241, 386), so in the crop it's x=(11, 156), width=145
print("Target width for 'da eTraduções.': ~145 px")

for name, path in fonts_to_test:
    if not os.path.exists(path):
        continue
    for sz in [14, 15, 16, 17, 18]:
        font = ImageFont.truetype(path, sz)
        w_etrad = font.getlength('da eTraduções.')
        w_link = font.getlength('https://etrad.me/pay')
        if abs(w_etrad - 145) < 8 or abs(w_link - 139) < 8:
            print(f"{name:20} sz={sz:2}: 'da eTraduções.'={w_etrad:.1f} (diff {w_etrad-145:+.1f}), link={w_link:.1f} (diff {w_link-139:+.1f})")
