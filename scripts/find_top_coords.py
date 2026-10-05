from PIL import Image
import numpy as np

img = Image.open('public/img/whatsapp-conversa-brian.webp').convert('RGB')
arr = np.array(img)

# Find 'da eTraduções.' in original image
top_text = []
for y in range(120, 145):
    for x in range(235, 390):
        r, g, b = arr[y, x]
        if r < 120 and g < 120 and b < 120:
            top_text.append((x, y))

print("Top text 'da eTraduções.' in full image:")
print("x:", min(p[0] for p in top_text), "to", max(p[0] for p in top_text))
print("y:", min(p[1] for p in top_text), "to", max(p[1] for p in top_text))

# Find 'eTraduções.' part specifically:
# 'da ' is from x=241 to ~256
etrad_text = [p for p in top_text if p[0] > 256]
print("'eTraduções.' x:", min(p[0] for p in etrad_text), "to", max(p[0] for p in etrad_text))
print("'eTraduções.' y:", min(p[1] for p in etrad_text), "to", max(p[1] for p in etrad_text))
