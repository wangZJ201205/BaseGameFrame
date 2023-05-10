# -*- coding: utf-8 -*-

from PIL import Image

# 打开图片
img = Image.open('08010.jpg')

# 每块的宽度和高度
block_width = 72
block_height = 36

# 图片的宽度和高度
img_width, img_height = img.size

# 计算水平和垂直方向上各有多少块
num_horizontal_blocks = img_width // block_width
num_vertical_blocks = img_height // block_height

# 遍历每一块并保存
for i in range(num_horizontal_blocks):
    for j in range(num_vertical_blocks):
        # 计算块的位置
        x = i * block_width
        y = j * block_height
        # 裁剪出块
        block = img.crop((x, y, x+block_width, y+block_height))
        # 保存块
        block.save('block_%d_%d.jpg' % (i, j))