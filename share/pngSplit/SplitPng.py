
# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import os,sys
from xml.etree import ElementTree
from PIL import Image

def tree_to_dict(tree):
    d = {}
    for index, item in enumerate(tree):
        if item.tag == 'key':
            if tree[index+1].tag == 'string':
                d[item.text] = tree[index + 1].text
            elif tree[index + 1].tag == 'true':
                d[item.text] = True
            elif tree[index + 1].tag == 'false':
                d[item.text] = False
            elif tree[index + 1].tag == 'integer':
                d[item.text] = int(tree[index + 1].text) 
            elif tree[index+1].tag == 'dict':
                d[item.text] = tree_to_dict(tree[index+1])

    return d 
	
def read_rect(dict):
	return [dict['x'],dict['y'],dict['width'],dict['height']];
	
    
def gen_png_from_plist(filename, outPath):
    plist_filename = filename + '.plist'
    png_filename = filename + '.png' 
    
    if checkPath(plist_filename) == False or checkPath(png_filename) ==False:
        print("don't find %s png  or plist"%filename)
        return
	
    #获取大图
    big_image = Image.open(png_filename)
    
    #读取plist
    root = ElementTree.fromstring(open(plist_filename, 'r').read())
    plist_dict = tree_to_dict(root[0])
    to_list = lambda x: x.replace('{','').replace('}','').split(',')
    to_int = lambda x:int(x)
	
    for k,v in plist_dict['frames'].items():
        if 'textureRect' in v:      
            textureRect = to_list(v['textureRect'])
        elif 'frame' in v:
            textureRect = to_list(v['frame'])
        else:
            textureRect = read_rect(v)
		
		#获得图像尺寸
        if 'spriteSize' in v:
            spriteSize = v['spriteSize']
        elif 'sourceSize' in v:
            spriteSize = v['sourceSize']
        elif 'spriteSourceSize' in v:
            spriteSize = v['spriteSourceSize']
        elif "width" in v:
            spriteSize = str(v['width']) + ',' +  str(v['height'])
            
        spriteSize = to_list(spriteSize)
        spriteSize = map(to_int, spriteSize) 
        spriteSize = list(spriteSize)
        result_box = textureRect
        
        #防止宽高小于0导致错误
        if spriteSize[0] <= 0 or spriteSize[1]<0 :
            print("< 0")
            continue
        result_image = Image.new('RGBA', spriteSize, (0,0,0,0))
        
        if (('textureRotated' in v) and v['textureRotated']) or (('rotated'in v) and v['rotated']): 
            result_box[0] = int(textureRect[0])
            result_box[1] = int(textureRect[1])
            result_box[2] = int(textureRect[0] + spriteSize[1])
            result_box[3] = int(textureRect[1] + spriteSize[0])
        else:
            result_box[0] = int(textureRect[0])
            result_box[1] = int(textureRect[1])
            result_box[2] = int(textureRect[0] + spriteSize[0])
            result_box[3] = int(textureRect[1] + spriteSize[1])

		
        #获得小图
        rect_on_big = big_image.crop(result_box)
        # 有旋转
        if (('textureRotated' in v) and v['textureRotated']) or (('rotated' in v) and v['rotated']):
            rect_on_big = rect_on_big.transpose(Image.ROTATE_90)
            
        result_image.paste(rect_on_big) 
		
		 
        if not os.path.isdir(outPath):
            os.mkdir(outPath)
        k = k.replace('/', '_')
        outfile = (outPath+'/' + k).replace('gift_', '')
        #print k
        if outfile.find('.png') == -1:
            outfile = outfile + '.png'
        print( outfile, "generated")
        result_image.save(outfile)


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
				
def checkPath(path):
	if not os.path.exists( path ):
		print( "not find 1 %s"%path)
		return False
	return True


if __name__ == '__main__': 
	if len( sys.argv ) < 2:
		dirName = input("Enter your DirName: ")
	else:
		dirName = sys.argv[1]
		
	if len( sys.argv ) < 3:
		outPath = input("Enter your outPath: ")
	else:
		outPath = sys.argv[2]
	
	 
	outPath = os.path.join( os.getcwd(), outPath )
	if not os.path.isdir( outPath ):
		os.mkdir( outPath )
	
	path =  os.path.join(os.getcwd(),dirName)
	if checkPath(path): 
		read_dir(path,outPath)