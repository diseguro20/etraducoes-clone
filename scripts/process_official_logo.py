from PIL import Image
import numpy as np
import os

input_path = r'C:/Users/diseg/.gemini/antigravity/brain/8d01d8b7-3af5-460b-b726-4cc131870687/.user_uploaded/media_1791247446881.png'
img = Image.open(input_path).convert('RGBA')
arr = np.array(img, dtype=float)
h, w, _ = arr.shape

# Distance from pure white
diff = np.sqrt(np.sum((arr[:, :, :3] - 255)**2, axis=2))
is_white = diff < 38

# White components that must stay WHITE
preserve_white = np.zeros((h, w), dtype=bool)

# 1. Speech bubble 'A'
preserve_white[215:325, 290:400] = is_white[215:325, 290:400]

# 2. Speech bubble '文'
preserve_white[410:535, 630:750] = is_white[410:535, 630:750]

# 3. Globe continents (inside circle centered at y=365, x=505 with radius ~135)
Y, X = np.ogrid[:h, :w]
globe_dist = np.sqrt((Y - 365)**2 + (X - 505)**2)
in_globe = globe_dist <= 135
preserve_white[in_globe] = is_white[in_globe]

# Alpha calculation with antialiasing
alpha = np.clip((diff - 8) / (45 - 8), 0, 1) * 255.0
alpha[preserve_white] = 255.0

# Defringe non-preserved areas
alpha_norm = np.clip(alpha / 255.0, 0.001, 1.0)
for c in range(3):
    defringed = (arr[:, :, c] - 255.0 * (1.0 - alpha_norm)) / alpha_norm
    defringed = np.clip(defringed, 0, 255)
    blend_mask = (~preserve_white) & (alpha > 0) & (alpha < 255)
    arr[blend_mask, c] = defringed[blend_mask]

arr[:, :, 3] = alpha

# Convert back to uint8 image
out_rgba = Image.fromarray(np.uint8(arr), 'RGBA')

# Crop to tight bounding box of visible content
non_empty = np.where(arr[:, :, 3] > 10)
ymin, ymax = non_empty[0].min(), non_empty[0].max()
xmin, xmax = non_empty[1].min(), non_empty[1].max()

pad = 8
ymin = max(0, ymin - pad)
ymax = min(h - 1, ymax + pad)
xmin = max(0, xmin - pad)
xmax = min(w - 1, xmax + pad)

cropped = out_rgba.crop((xmin, ymin, xmax + 1, ymax + 1))
print(f"Cropped logo size: {cropped.size}")

out_dir = r'C:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/public/img'
os.makedirs(out_dir, exist_ok=True)

light_path = os.path.join(out_dir, 'traduztudo-official-logo.png')
cropped.save(light_path, 'PNG', optimize=True)
print(f"Saved light mode logo to: {light_path}")

# Dark-mode logo:
# Only change the text 'Traduz' (which is in lower half, x < 550, y > 400 in cropped space)
# and dark elements to crisp bright white so it pops on dark background!
dark_arr = np.array(cropped, dtype=float)
ch, cw, _ = dark_arr.shape

# The word 'Traduz' is located approximately at Y from 380 to 520 in cropped coordinates, and X < 540
# Also the line at bottom
is_dark_in_text = (
    (dark_arr[:, :, 3] > 30) & 
    (dark_arr[:, :, 0] < 45) & 
    (dark_arr[:, :, 1] < 60) & 
    (dark_arr[:, :, 2] < 95)
)

# For Y > 350 (text area and bottom line):
for y in range(int(ch * 0.55), ch):
    for x in range(cw):
        if is_dark_in_text[y, x]:
            dark_arr[y, x, 0] = 255.0
            dark_arr[y, x, 1] = 255.0
            dark_arr[y, x, 2] = 255.0

# Also give the speech bubble 'A' a subtle white border/glow so it doesn't get lost on dark backgrounds
dark_img = Image.fromarray(np.uint8(dark_arr), 'RGBA')
dark_path = os.path.join(out_dir, 'traduztudo-official-logo-white.png')
dark_img.save(dark_path, 'PNG', optimize=True)
print(f"Saved dark mode logo to: {dark_path}")

# Preview dark
comp_dark = Image.new('RGB', (cropped.width + 40, cropped.height + 40), (15, 23, 42))
comp_dark.paste(dark_img, (20, 20), dark_img)
comp_dark.save('scripts/logo_preview_dark.png')
print("Updated dark preview: scripts/logo_preview_dark.png")
