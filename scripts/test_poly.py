from PIL import Image, ImageDraw

im = Image.open('public/img/stamp_crop.png').convert('RGB')
debug_im = im.copy()
draw = ImageDraw.Draw(debug_im)

# Polygon for clearing eTraduções
# Top line: (40, 52) to (115, 74)
# Bottom line: (115, 83) to (40, 61)
poly = [(40, 52), (115, 74), (115, 83), (40, 61)]
draw.polygon(poly, outline=(255, 0, 0), width=1)

debug_im.save('public/img/test_poly.png')
print("Saved test_poly.png")
