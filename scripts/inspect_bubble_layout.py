from PIL import Image
import numpy as np

img = Image.open('public/img/whatsapp-conversa-brian.webp').convert('RGB')
arr = np.array(img)

# Find speech bubble right edge by testing y=600 (between lines of text, where it is pure white)
for x in range(400, 563):
    r, g, b = arr[600, x]
    if (r, g, b) != (255, 255, 255):
        print(f"Bubble right edge at y=600 is at x={x}, color=({r},{g},{b})")
        break

# Find speech bubble left edge at y=600
for x in range(0, 200):
    r, g, b = arr[600, x]
    if (r, g, b) == (255, 255, 255):
        print(f"Bubble left edge at y=600 is at x={x}")
        break

# Find where 'Contrate agora mesmo em: ' starts in x
for x in range(50, 200):
    column = arr[655:680, x]
    # Check if there is text in this column (non-white)
    if np.any(np.mean(column, axis=1) < 200):
        print(f"'Contrate' starts at x={x}")
        break

# Find where 'da eTraduções.' starts in x
for x in range(150, 300):
    column = arr[145:175, x]
    if np.any(np.mean(column, axis=1) < 200):
        print(f"'da eTraduções.' starts at x={x}")
        break
    
# Find where '13:19' is in bottom bubble
for y in range(670, 714):
    for x in range(400, 520):
        r, g, b = arr[y, x]
        if r < 200 or g < 200 or b < 200:
            # Check if this is the gray timestamp
            pass
