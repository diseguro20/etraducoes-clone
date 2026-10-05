from PIL import Image
import numpy as np

img = Image.open('public/img/whatsapp-conversa-brian.webp').convert('RGB')
arr = np.array(img)

# Let's find bubble background around y=665:
# Inside the white bubble, pixels are (255, 255, 255).
# Outside the bubble (to the right, e.g. x > 450), the background color is beige/light brown.
for x in range(400, 563):
    r, g, b = arr[665, x]
    # Check when it's not white and not link color
    if (r, g, b) != (255, 255, 255) and not (b > 180 and r < 100):
        print(f"Right edge of white bubble at y=665 is x={x}, color=({r},{g},{b})")
        break

# Let's check text line 2 in top bubble:
# Find exact start of "da eTraduções."
da_pixels = []
for x in range(150, 450):
    for y in range(145, 175):
        r, g, b = arr[y, x]
        if r < 100 and g < 100 and b < 100:
            da_pixels.append((x, y, (r, g, b)))

min_x = min(p[0] for p in da_pixels)
max_x = max(p[0] for p in da_pixels)
min_y = min(p[1] for p in da_pixels)
max_y = max(p[1] for p in da_pixels)
print(f"Actual 'da eTraduções.' box: x=({min_x}, {max_x}), y=({min_y}, {max_y})")

# Let's check the bottom bubble text "Contrate agora mesmo em: "
bot_pixels = []
for x in range(50, 400):
    for y in range(655, 680):
        r, g, b = arr[y, x]
        if r < 100 and g < 100 and b < 100:
            bot_pixels.append((x, y, (r, g, b)))

min_x_b = min(p[0] for p in bot_pixels)
max_x_b = max(p[0] for p in bot_pixels)
min_y_b = min(p[1] for p in bot_pixels)
max_y_b = max(p[1] for p in bot_pixels)
print(f"Actual 'Contrate agora mesmo em: ' box: x=({min_x_b}, {max_x_b}), y=({min_y_b}, {max_y_b})")

# Link box:
blue_pixels = []
for x in range(250, 500):
    for y in range(655, 680):
        r, g, b = arr[y, x]
        if b > 150 and r < 120:
            blue_pixels.append((x, y, (r, g, b)))

min_x_l = min(p[0] for p in blue_pixels)
max_x_l = max(p[0] for p in blue_pixels)
min_y_l = min(p[1] for p in blue_pixels)
max_y_l = max(p[1] for p in blue_pixels)
print(f"Actual link box: x=({min_x_l}, {max_x_l}), y=({min_y_l}, {max_y_l})")

# Time '13:19' box:
time_pixels = []
for x in range(350, 520):
    for y in range(680, 710):
        r, g, b = arr[y, x]
        if r < 180 and g < 180 and b < 180:
            time_pixels.append((x, y, (r, g, b)))

print(f"Actual time box: x=({min(p[0] for p in time_pixels)}, {max(p[0] for p in time_pixels)}), y=({min(p[1] for p in time_pixels)}, {max(p[1] for p in time_pixels)})")
