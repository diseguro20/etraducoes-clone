from PIL import Image
import numpy as np

img = Image.open('public/img/whatsapp-conversa-brian.webp').convert('RGB')
arr = np.array(img)

# Area 1: Top bubble around y=110 to 180, x=220 to 500
print("--- AREA 1: TOP BUBBLE ---")
top_rows = []
for y in range(110, 180):
    for x in range(220, 500):
        r, g, b = arr[y, x]
        if r < 240 or g < 240 or b < 240:
            top_rows.append((y, x, (r, g, b)))

# Line 1: "Olá! Eu sou o Brian 🤖, a inteligência artificial"
# Line 2: "da eTraduções."
line2_rows = [p for p in top_rows if p[0] >= 140]
if line2_rows:
    min_x = min(p[1] for p in line2_rows)
    max_x = max(p[1] for p in line2_rows)
    min_y = min(p[0] for p in line2_rows)
    max_y = max(p[0] for p in line2_rows)
    print(f"Line 2 'da eTraduções.' box: x=({min_x}, {max_x}), y=({min_y}, {max_y})")
    
    # Also find 'da ' part vs 'eTraduções.'
    da_rows = [p for p in line2_rows if p[1] < min_x + 30]
    print(f"'da' box: x=({min(p[1] for p in da_rows)}, {max(p[1] for p in da_rows)})")

# Area 2: Bottom bubble around y=640 to 710, x=100 to 520
print("\n--- AREA 2: BOTTOM BUBBLE ---")
bot_rows = []
for y in range(640, 714):
    for x in range(100, 520):
        r, g, b = arr[y, x]
        if r < 240 or g < 240 or b < 240:
            bot_rows.append((y, x, (r, g, b)))

link_line = [p for p in bot_rows if p[0] <= 680]
time_pixels = [p for p in bot_rows if p[0] > 680 and p[1] > 400]

min_x_bot = min(p[1] for p in link_line)
max_x_bot = max(p[1] for p in link_line)
min_y_bot = min(p[0] for p in link_line)
max_y_bot = max(p[0] for p in link_line)
print(f"Link line box: x=({min_x_bot}, {max_x_bot}), y=({min_y_bot}, {max_y_bot})")

if time_pixels:
    print(f"Time '13:19' box: x=({min(p[1] for p in time_pixels)}, {max(p[1] for p in time_pixels)}), y=({min(p[0] for p in time_pixels)}, {max(p[0] for p in time_pixels)})")

# Find right boundary of the bubble itself
# The bubble has background #ffffff, outside the bubble is #f3ede4 (or beige background)
print("\nBubble right edge around y=665:")
for x in range(400, 550):
    r, g, b = arr[665, x]
    if r < 250 or g < 250 or b < 250:
        print(f"Bubble boundary at x={x}, color=({r},{g},{b})")
        break
