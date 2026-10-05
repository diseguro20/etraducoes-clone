from PIL import Image

img = Image.open('public/img/whatsapp-conversa-brian.webp')
w, h = img.size
print("Image size:", w, h)

# Let's crop the bottom bubble
# The bottom bubble is roughly in the lower third
bottom_crop = img.crop((0, int(h * 0.65), w, h))
bottom_crop.save('public/screenshots/bottom_bubble_crop.png')

# Let's crop the first bubble
top_crop = img.crop((0, int(h * 0.1), w, int(h * 0.45)))
top_crop.save('public/screenshots/top_bubble_crop.png')

print("Saved crops")
