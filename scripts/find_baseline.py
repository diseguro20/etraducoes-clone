from PIL import Image
import numpy as np

img = Image.open('public/img/whatsapp-conversa-brian.webp').convert('RGB')
arr = np.array(img)

# In the bottom bubble, let's look at the letters without descenders like 's', 'e', 'm', 'a' in 'https://etrad.me'
# Between x=314 and 430, y=655 to 680
# The baseline is the bottom edge of non-descender letters (s, :, e, r, a, m)
base_y = []
for x in range(314, 430):
    for y in range(655, 680):
        r, g, b = arr[y, x]
        if b > 150 and r < 100:
            base_y.append(y)

print("Link blue pixels y range:", min(base_y), "to", max(base_y))

# Baseline of 'e' in 'etrad' (x around 370-380)
e_pixels = [y for y in range(655, 680) if arr[y, 375, 2] > 150 and arr[y, 375, 0] < 100]
print("'e' y range:", min(e_pixels), "to", max(e_pixels))

# Baseline of 'a' in 'etrad' (x around 395-405)
a_pixels = [y for y in range(655, 680) if arr[y, 400, 2] > 150 and arr[y, 400, 0] < 100]
print("'a' y range:", min(a_pixels), "to", max(a_pixels))
