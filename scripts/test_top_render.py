from PIL import Image, ImageFont, ImageDraw

orig = Image.open('public/screenshots/line2_magnified.png')
w, h = orig.size

# Render test images
for name, p, sz in [
    ('catamaran_12', 'scripts/Catamaran-400.ttf', 12),
    ('catamaran_500_11', 'scripts/Catamaran-500.ttf', 11),
    ('segoe_12', 'C:\\Windows\\Fonts\\segoeui.ttf', 12),
    ('roboto_11', 'scripts/Roboto-Regular.ttf', 11),
]:
    font = ImageFont.truetype(p, sz)
    im = Image.new('RGB', (100, 20), (255, 255, 255))
    draw = ImageDraw.Draw(im)
    draw.text((2, 2), 'da eTraduções.', fill=(60, 61, 64), font=font)
    im_mag = im.resize((im.width * 4, im.height * 4), Image.Resampling.NEAREST)
    im_mag.save(f'public/screenshots/test_top_{name}.png')

print("Saved test renders for top bubble")
