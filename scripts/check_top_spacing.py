from PIL import Image
import numpy as np

# Let's inspect the original image lines:
orig = Image.open('public/img/whatsapp-conversa-brian.webp').convert('RGB')
arr = np.array(orig)

# Line 1: y=110 to 125, Line 2: y=125 to 138, Line 3: y=150 to 165
# Baseline of line 1 (x=242 to 350)
l1_pixels = [y for y in range(110, 125) if np.min(arr[y, 242:350]) < 150]
l2_pixels = [y for y in range(125, 140) if np.min(arr[y, 242:350]) < 150]
l3_pixels = [y for y in range(150, 170) if np.min(arr[y, 242:350]) < 150]

print("Original Line 1 y range:", min(l1_pixels), "to", max(l1_pixels))
print("Original Line 2 y range:", min(l2_pixels), "to", max(l2_pixels))
print("Original Line 3 y range:", min(l3_pixels), "to", max(l3_pixels))
print(f"Gap L1->L2: {min(l2_pixels) - min(l1_pixels)}, Gap L2->L3: {min(l3_pixels) - min(l2_pixels)}")

# Now check verify_top_direct.png
direct = Image.open('public/screenshots/verify_top_direct.png').convert('RGB')
arr_d = np.array(direct)
# Crop offset in full image was (220, 105)
# In direct crop:
# Line 1 is y around 10 to 20
# Line 2 is y around 20 to 35
# Line 3 is y around 45 to 60
d_l1 = [y for y in range(5, 20) if np.min(arr_d[y, 20:130]) < 150]
d_l2 = [y for y in range(20, 35) if np.min(arr_d[y, 20:130]) < 150]
d_l3 = [y for y in range(45, 65) if np.min(arr_d[y, 20:130]) < 150]
print("\nDirect Line 1 in crop:", min(d_l1), "to", max(d_l1))
print("Direct Line 2 in crop:", min(d_l2), "to", max(d_l2))
print("Direct Line 3 in crop:", min(d_l3), "to", max(d_l3))
print(f"Direct Gap L1->L2: {min(d_l2) - min(d_l1)}, Gap L2->L3: {min(d_l3) - min(d_l2)}")
