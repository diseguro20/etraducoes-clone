from PIL import Image
import numpy as np

img = Image.open('public/img/whatsapp-conversa-brian.webp')
# Crop link
link_crop = img.crop((310, 650, 460, 685))
link_crop.save('public/screenshots/link_only.png')

# Let's inspect character heights
arr = np.array(link_crop.convert('RGB'))
# Find all blue pixels
blue_pts = []
for y in range(arr.shape[0]):
    for x in range(arr.shape[1]):
        r, g, b = arr[y, x]
        if b > 150 and r < 120:
            blue_pts.append((y, x))

print("Link height:", max(p[0] for p in blue_pts) - min(p[0] for p in blue_pts) + 1)
print("Link width:", max(p[1] for p in blue_pts) - min(p[1] for p in blue_pts) + 1)
