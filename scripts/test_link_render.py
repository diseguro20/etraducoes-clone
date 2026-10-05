from PIL import Image, ImageFont, ImageDraw

# Compare bottom bubble link rendering
link_orig = Image.open('public/screenshots/link_only.png')

for w in [400, 500]:
    for sz in [15, 16, 17]:
        font = ImageFont.truetype(f'scripts/Catamaran-{w}.ttf', sz)
        im = Image.new('RGB', (160, 25), (255, 255, 255))
        draw = ImageDraw.Draw(im)
        draw.text((2, 2), 'https://etrad.me/pay', fill=(46, 126, 198), font=font)
        im_mag = im.resize((im.width * 4, im.height * 4), Image.Resampling.NEAREST)
        im_mag.save(f'public/screenshots/test_link_{w}_{sz}.png')

print("Saved test link renders")
