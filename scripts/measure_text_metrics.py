import os
from PIL import Image, ImageFont, ImageDraw
import numpy as np

crop = Image.open('public/screenshots/link_line_crop.png').convert('RGB')
arr_crop = np.array(crop)

# Let's inspect character dimensions and baseline
# In link_line_crop.png, let's find the baseline of "Contrate agora mesmo em: https://"
# The text y range
text_y = []
for y in range(crop.height):
    for x in range(crop.width):
        r, g, b = arr_crop[y, x]
        if r < 200 or g < 200 or b < 200:
            text_y.append(y)

print(f"Crop text y min={min(text_y)}, max={max(text_y)}, height={max(text_y) - min(text_y) + 1}")

# Measure letters like 'C', 'o', 'n', 't', 'r', 'a', 't', 'e'
# Let's test font sizes in Segoe UI, Roboto (if available), Arial
for name in ["segoeui.ttf", "arial.ttf", "calibri.ttf"]:
    for sz in range(12, 17):
        font = ImageFont.truetype(f"C:\\Windows\\Fonts\\{name}", sz)
        bbox = font.getbbox("Contrate agora mesmo em: ")
        print(f"{name} sz={sz}: bbox={bbox}, width={bbox[2]-bbox[0]}, height={bbox[3]-bbox[1]}")
