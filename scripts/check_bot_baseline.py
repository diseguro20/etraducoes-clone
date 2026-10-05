from PIL import Image
import numpy as np

orig = Image.open('public/img/whatsapp-conversa-brian.webp').convert('RGB')
arr_orig = np.array(orig)

# Original link pixels
orig_link_y = [y for y in range(655, 680) if np.min(arr_orig[y, 314:450, 0]) < 100 and np.max(arr_orig[y, 314:450, 2]) > 150]
print("Original link y:", min(orig_link_y), "to", max(orig_link_y))

# Direct render link pixels
direct = Image.open('public/screenshots/verify_bot_direct.png').convert('RGB')
arr_d = np.array(direct)
# Crop offset is (100, 640)
# Check link in crop (x around 214, y around 18)
d_link_y = [y for y in range(10, 35) if np.min(arr_d[y, 214:350, 0]) < 100 and np.max(arr_d[y, 214:350, 2]) > 150]
print("Direct link in crop y:", min(d_link_y), "to", max(d_link_y), "-> full y:", min(d_link_y) + 640, "to", max(d_link_y) + 640)

# Check prefix 'Contrate agora mesmo em: ' baseline in orig vs link baseline
# Non-descenders in prefix (e.g. 'e', 'm', 'o', ':')
prefix_y = [y for y in range(655, 680) if np.min(arr_orig[y, 118:310]) < 100]
print("Prefix y in orig:", min(prefix_y), "to", max(prefix_y))
