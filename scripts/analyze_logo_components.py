from PIL import Image
import numpy as np
from collections import deque

input_path = r'C:/Users/diseg/.gemini/antigravity/brain/8d01d8b7-3af5-460b-b726-4cc131870687/.user_uploaded/media_1791247446881.png'
img = Image.open(input_path).convert('RGBA')
arr = np.array(img)
h, w, _ = arr.shape

# Distance from pure white
diff = np.sqrt(np.sum((arr[:, :, :3].astype(float) - 255)**2, axis=2))
is_white = diff < 38

visited = np.zeros((h, w), dtype=bool)
components = []

for y in range(h):
    for x in range(w):
        if is_white[y, x] and not visited[y, x]:
            comp_pixels = []
            q = deque([(y, x)])
            visited[y, x] = True
            while q:
                cy, cx = q.popleft()
                comp_pixels.append((cy, cx))
                for dy, dx in [(-1,0), (1,0), (0,-1), (0,1)]:
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and is_white[ny, nx]:
                        visited[ny, nx] = True
                        q.append((ny, nx))
            if len(comp_pixels) > 30:
                ys = [p[0] for p in comp_pixels]
                xs = [p[1] for p in comp_pixels]
                components.append({
                    'size': len(comp_pixels),
                    'ymin': min(ys), 'ymax': max(ys),
                    'xmin': min(xs), 'xmax': max(xs),
                    'cy': int(sum(ys)/len(ys)),
                    'cx': int(sum(xs)/len(xs)),
                    'pixels': comp_pixels
                })

components.sort(key=lambda c: c['size'], reverse=True)
print(f"Total components > 30px: {len(components)}")
for i, c in enumerate(components[:20]):
    print(f"Comp {i}: size={c['size']}, y=[{c['ymin']}-{c['ymax']}], x=[{c['xmin']}-{c['xmax']}], center=({c['cy']}, {c['cx']})")
