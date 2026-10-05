from PIL import Image
import numpy as np

img = Image.open('public/img/whatsapp-conversa-brian.webp').convert('RGB')
arr = np.array(img)

# Let's inspect the text "Contrate agora mesmo em: https://etrad.me/pay"
# Let's find rows where text pixels exist in the bottom bubble
# The bubble starts around y=500
# Let's search between y=500 and 700, x=100 and 500
rows = []
for y in range(500, 714):
    for x in range(100, 500):
        r, g, b = arr[y, x]
        # Text is not white (e.g. gray or blue)
        if r < 240 or g < 240 or b < 240:
            rows.append((y, x, (r, g, b)))

print(f"Found {len(rows)} non-white pixels in bottom area")
min_y = min(r[0] for r in rows)
max_y = max(r[0] for r in rows)
print(f"Text y-range: {min_y} to {max_y}")

# Find blue pixels (the link https://etrad.me/pay)
blue_pixels = [r for r in rows if r[2][2] > 180 and r[2][0] < 100]
print(f"Found {len(blue_pixels)} blue pixels")
if blue_pixels:
    link_min_x = min(r[1] for r in blue_pixels)
    link_max_x = max(r[1] for r in blue_pixels)
    link_min_y = min(r[0] for r in blue_pixels)
    link_max_y = max(r[0] for r in blue_pixels)
    print(f"Link bounding box: x=({link_min_x}, {link_max_x}), y=({link_min_y}, {link_max_y})")
    # Sample link color
    center_blue = [r[2] for r in blue_pixels if r[0] == (link_min_y + link_max_y)//2]
    print(f"Sample blue colors: {center_blue[:5]}")
