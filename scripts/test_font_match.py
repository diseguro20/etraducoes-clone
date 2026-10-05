import os
from PIL import Image, ImageFont, ImageDraw

# Let's inspect installed system fonts on Windows
fonts_dir = "C:\\Windows\\Fonts"
candidate_fonts = [
    "segoeui.ttf", "segoeuib.ttf", "arial.ttf", "arialbd.ttf",
    "calibri.ttf", "calibrib.ttf", "tahoma.ttf", "tahomabd.ttf"
]

for cf in candidate_fonts:
    full = os.path.join(fonts_dir, cf)
    if os.path.exists(full):
        print("Found font:", cf)

# Check text heights and character sizes in link_line_crop.png
img = Image.open('public/screenshots/link_line_crop.png')
w, h = img.size
print("Crop size:", w, h)
