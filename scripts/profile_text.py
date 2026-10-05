from PIL import Image
import numpy as np

im = Image.open('public/img/stamp_crop.png').convert('RGB')
arr = np.array(im)

# Let's inspect x from 45 to 110
# For each x, print the y coordinates of black pixels (mean < 120)
print("Scanning column profiles:")
for x in [50, 60, 70, 80, 90, 100]:
    dark_ys = [y for y in range(35, 80) if np.mean(arr[y, x]) < 180]
    print(f"x={x}: dark ys = {dark_ys}")
