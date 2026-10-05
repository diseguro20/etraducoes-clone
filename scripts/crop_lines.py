from PIL import Image
import numpy as np

img = Image.open('public/img/whatsapp-conversa-brian.webp')

# Let's crop line around y=650 to 690, x=100 to 500
line_crop = img.crop((100, 650, 480, 690))
line_crop.save('public/screenshots/link_line_crop.png')

# Let's analyze the top bubble text "da eTraduções."
arr = np.array(img.convert('RGB'))
# Look between y=160 and 220, x=220 and 400
etrad_pixels = []
for y in range(160, 220):
    for x in range(220, 380):
        r, g, b = arr[y, x]
        if r < 100 and g < 100 and b < 100:
            etrad_pixels.append((y, x, (r, g, b)))

if etrad_pixels:
    min_x = min(p[1] for p in etrad_pixels)
    max_x = max(p[1] for p in etrad_pixels)
    min_y = min(p[0] for p in etrad_pixels)
    max_y = max(p[0] for p in etrad_pixels)
    print(f"Top bubble 'da eTraduções.' box: x=({min_x}, {max_x}), y=({min_y}, {max_y})")
    top_line_crop = img.crop((220, 160, 380, 210))
    top_line_crop.save('public/screenshots/top_line_crop.png')
