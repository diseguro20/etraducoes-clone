from PIL import Image
import numpy as np

im = Image.open('public/img/top_header_crop.png').convert('RGB')
arr = np.array(im)

# Find gray pixels in ETD
grays = []
h, w, _ = arr.shape
for y in range(h):
    for x in range(w):
        val = np.mean(arr[y, x])
        if 160 < val < 230:
            grays.append((x, y, arr[y, x]))

print('Sample grays in top header:', len(grays))
