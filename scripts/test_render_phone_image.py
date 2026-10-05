from PIL import Image, ImageFont, ImageDraw
import numpy as np

# Load the original image
orig = Image.open('public/img/whatsapp-conversa-brian.webp').convert('RGBA')
w, h = orig.size

# --- 1. Test Direct PIL rendering ---
img_direct = orig.copy()
draw = ImageDraw.Draw(img_direct)

# Clear top area: x=240 to 330, y=124 to 138 with white
# Keep alpha intact
for y in range(124, 138):
    for x in range(240, 330):
        img_direct.putpixel((x, y), (255, 255, 255, 255))

font_top = ImageFont.truetype('scripts/Catamaran-400.ttf', 12)
draw.text((241, 122), 'da TraduzTudo.', fill=(60, 61, 64, 255), font=font_top)

# Clear bottom link area: x=312 to 490, y=658 to 678 with white
for y in range(658, 678):
    for x in range(312, 490):
        img_direct.putpixel((x, y), (255, 255, 255, 255))

font_bot = ImageFont.truetype('scripts/Catamaran-400.ttf', 16)
draw.text((314, 658), 'https://traduztudo.com', fill=(46, 126, 198, 255), font=font_bot)

# Save close-up crops
crop_top = img_direct.crop((220, 105, 420, 175))
crop_top.save('public/screenshots/verify_top_direct.png')

crop_bot = img_direct.crop((100, 640, 520, 700))
crop_bot.save('public/screenshots/verify_bot_direct.png')

# --- 2. Test Super-sampled rendering (4x) ---
img_ss = orig.copy()
scale = 4

# Top area super-sampled
top_w, top_h = 200, 30
top_patch = Image.new('RGBA', (top_w * scale, top_h * scale), (255, 255, 255, 255))
draw_patch = ImageDraw.Draw(top_patch)
font_top_ss = ImageFont.truetype('scripts/Catamaran-400.ttf', 12 * scale)
draw_patch.text((1 * scale, -2 * scale), 'da TraduzTudo.', fill=(60, 61, 64, 255), font=font_top_ss)
top_patch_down = top_patch.resize((top_w, top_h), Image.Resampling.LANCZOS)

# Paste on img_ss
img_ss.paste(top_patch_down, (240, 124))

# Bottom link super-sampled
bot_w, bot_h = 200, 30
bot_patch = Image.new('RGBA', (bot_w * scale, bot_h * scale), (255, 255, 255, 255))
draw_bot_patch = ImageDraw.Draw(bot_patch)
font_bot_ss = ImageFont.truetype('scripts/Catamaran-400.ttf', 16 * scale)
draw_bot_patch.text((2 * scale, 0), 'https://traduztudo.com', fill=(46, 126, 198, 255), font=font_bot_ss)
bot_patch_down = bot_patch.resize((bot_w, bot_h), Image.Resampling.LANCZOS)

img_ss.paste(bot_patch_down, (312, 658))

crop_top_ss = img_ss.crop((220, 105, 420, 175))
crop_top_ss.save('public/screenshots/verify_top_ss.png')

crop_bot_ss = img_ss.crop((100, 640, 520, 700))
crop_bot_ss.save('public/screenshots/verify_bot_ss.png')

print("Saved direct and super-sampled crops for verification")
