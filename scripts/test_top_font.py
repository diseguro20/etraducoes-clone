import os
from PIL import Image, ImageFont, ImageDraw
import numpy as np

# Test top bubble fonts
fonts = {
    'Catamaran-400': 'scripts/Catamaran-400.ttf',
    'Catamaran-500': 'scripts/Catamaran-500.ttf',
    'Roboto-Regular': 'scripts/Roboto-Regular.ttf',
    'SegoeUI': 'C:\\Windows\\Fonts\\segoeui.ttf',
    'Arial': 'C:\\Windows\\Fonts\\arial.ttf'
}

print("--- TOP BUBBLE (Target: 'da eTraduções.' width ~78-79, ascender height ~9) ---")
for name, p in fonts.items():
    if not os.path.exists(p): continue
    for sz in range(10, 16):
        f = ImageFont.truetype(p, sz)
        w = f.getlength('da eTraduções.')
        # check 'd' bounding box
        bbox = f.getbbox('d')
        h = bbox[3] - bbox[1]
        if 72 <= w <= 86:
            print(f"{name:16} sz={sz}: width={w:.1f}, d_h={h}")
