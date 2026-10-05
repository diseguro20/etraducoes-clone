from PIL import Image, ImageFont, ImageDraw

# Open the downloaded pristine original image
orig = Image.open('public/img/whatsapp-conversa-brian.webp').convert('RGBA')

# Clear top line 'da eTraduções.'
draw = ImageDraw.Draw(orig)

# Clear from x=240 to 335, y=123 to 138 with pure white
for y in range(123, 138):
    for x in range(240, 335):
        orig.putpixel((x, y), (255, 255, 255, 255))

font_top = ImageFont.truetype('scripts/Catamaran-400.ttf', 12)
draw.text((242, 120), 'da TraduzTudo.', fill=(60, 61, 64, 255), font=font_top)

# Clear bottom link 'https://etrad.me/pay'
# Clear from x=312 to 490, y=658 to 678 with pure white
for y in range(658, 678):
    for x in range(312, 490):
        orig.putpixel((x, y), (255, 255, 255, 255))

font_bot = ImageFont.truetype('scripts/Catamaran-400.ttf', 16)
draw.text((314, 655), 'https://traduztudo.com', fill=(46, 126, 198, 255), font=font_bot)

# Save as lossless webp
orig.save('public/img/whatsapp-conversa-brian.webp', format='WEBP', lossless=True)
print("Successfully saved public/img/whatsapp-conversa-brian.webp (lossless)")

# Generate crops for visual verification
crop_top = orig.crop((220, 100, 440, 180))
crop_top.save('public/screenshots/final_phone_top_crop.png')

crop_bot = orig.crop((95, 630, 530, 714))
crop_bot.save('public/screenshots/final_phone_bot_crop.png')

print("Saved verification crops")
