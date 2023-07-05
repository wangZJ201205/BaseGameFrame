

import os,sys
from xml.etree import ElementTree
from PIL import Image
import glob
import json
# print(bullet_data.bullet)

def gen_png_from_plist(key,dict,dir,outPath):
    # dict = bullet_data.bullet[key]
    # 获取大图

    extension = dict["a_name"].split(".")[-1]
    if extension == "pkm":
        return

    big_image = Image.open(dir+"\\"+dict["a_name"])

    result_image = Image.new('RGBA', dict["size"], (0, 0, 0, 0))
    # 获得小图
    result_box = []
    result_box.append( dict["f_quad"][0])
    result_box.append( dict["f_quad"][1])
    result_box.append( dict["f_quad"][0] + dict["f_quad"][2])
    result_box.append( dict["f_quad"][1] + dict["f_quad"][3])
    rect_on_big = big_image.crop(result_box)

    left  = dict["size"][0] - dict["f_quad"][2] - dict["trim"][2]
    upper = dict["size"][1] - dict["f_quad"][3] - dict["trim"][3]
    right = left + dict["size"][0]
    lower = upper + dict["size"][1]

    result_image1 = Image.new('RGBA', dict["size"], (0, 0, 0, 0))
    result_image1.paste(rect_on_big)

    result_image.paste(result_image1, (left, upper, right, lower))
    # result_image.paste(result_image1)

    if not os.path.isdir(outPath):
        os.mkdir(outPath)
    outfile = (outPath + '/' + key).replace('gift_', '')
    # print k
    if outfile.find('.png') == -1:
        outfile = outfile + '.png'
    print(outfile, "generated")
    result_image.save(outfile)

    for texturename in dict['alias']:
        outfile = (outPath + '/' + texturename).replace('gift_', '')
        # print k
        if outfile.find('.png') == -1:
            outfile = outfile + '.png'
        print(outfile, "generated")
        result_image.save(outfile)


def checkPath(path):
	if not os.path.exists( path ):
		print( "not find 1 %s"%path)
		return False
	return True

def read_dir( path, outPath):
    for name in os.listdir( path ):
        if os.path.isdir( os.path.join(path, name) ):
            read_dir(os.path.join(path, name),outPath )
        else:
            portion = os.path.splitext(name)
            if portion[1] == '.plist':
                fileName = os.path.join(path, portion[0])
                outDir = os.path.join(outPath, portion[0]);
                gen_png_from_plist(fileName , outDir)

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    if len(sys.argv) < 2:
        dirName = input("寻找目录: ")
    else:
        dirName = sys.argv[1]

    if len(sys.argv) < 3:
        outPath = input("输出目录: ")
    else:
        outPath = sys.argv[2]

    # outPath = os.path.join(os.getcwd(), outPath)
    # if not os.path.isdir(outPath):
    #     os.mkdir(outPath)
    #
    # path = os.path.join(os.getcwd(), dirName)
    # if checkPath(path):
    #     read_dir(path, outPath)

    python_files = glob.glob(os.path.join(dirName, '*.py'))

    # 遍历所有Python文件并进行处理
    for file in python_files:
        with open(file, 'r') as f:
            # 在这里进行你想要的处理操作
            # 例如，打印文件内容
            print(">>>>>>>>>>filename>"+file)
            file_content = f.read()
            data = eval(file_content)
            for key in data.keys():
                print(key)
                gen_png_from_plist(key, data[key],dirName,outPath)



