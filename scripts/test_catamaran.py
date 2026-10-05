from PIL import Image, ImageFont, ImageDraw

crop = Image.open('public/screenshots/link_line_crop.png')

for w in [400, 500, 600]:
    for sz in range(14, 20):
        try:
            font = ImageFont.truetype(f'scripts/Catamaran-{w}.ttf', sz)
            length = font.getlength('Contrate agora mesmo em: ')
            print(f'Catamaran-{w} sz={sz}: length={length}')
        except Exception as e:
            print(e)
