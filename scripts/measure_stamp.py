from PIL import Image
import numpy as np

# Load cropped stamp
im = Image.open('public/img/stamp_crop.png').convert('RGB')
arr = np.array(im)

# Let's inspect pixels around eTraduções
# The stamp crop is 160x115.
# Let's find the black pixels in the region below BRASIL
print("Crop shape:", arr.shape)

# Let's find where eTraduções is located within stamp_crop.png
# Let's search for non-white pixels in the lower half of the seal
h, w, _ = arr.shape
for y in range(h):
    dark_count = sum(1 for x in range(w) if np.mean(arr[y, x]) < 100)
    # print line statistics if dark pixels found
# Let's write an image with grid to see exact pixel coordinates
debug_im = im.copy()
from PIL import ImageDraw
draw = ImageDraw.Draw(debug_im)

# Draw grid every 10 pixels
for x in range(0, w, 10):
    draw.line([(x, 0), (x, h)], fill=(200, 200, 200, 100) if x % 50 != 0 else (255, 0, 0, 150))
for y in range(0, h, 10):
    draw.line([(0, y), (w, y)], fill=(200, 200, 200, 100) if y % 50 != 0 else (255, 0, 0, 150))

debug_im.save('public/img/stamp_grid.png')
print("Saved stamp_grid.png")
