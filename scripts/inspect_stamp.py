from PIL import Image

im = Image.open('public/img/apostilamento-de-haia-orig.png')
w, h = im.size
print(f"Size: {w}x{h}, Mode: {im.mode}")

# The stamp is in the lower-middle left:
# Let's crop around x: 180 to 330, y: 170 to 270
crop_box = (170, 160, 330, 275)
stamp = im.crop(crop_box)
stamp.save('public/img/stamp_crop.png')
print("Saved stamp_crop.png")
