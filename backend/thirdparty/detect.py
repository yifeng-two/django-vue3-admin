'''
Author: yifeng
Date: 2022-08-08 21:03:26
LastEditors: yifeng
LastEditTime: 2022-08-27 23:24:25
Description: 
'''
import os
import sys
import datetime
from pathlib import Path
from apps.detect.result import store_data_by_model
from yolov5.yolov5 import Darknet
from thirdparty.config import orgin_path, save_path, net_path, database_dict_key, front_dict_key
BASE_DIR = os.getcwd()
PRE_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))
sys.path.append(BASE_DIR)
sys.path.append(PRE_DIR)
# print(sys.path)

def getFlist(path):
    filenames = []
    for root, dirs, files in os.walk(path):
        for file in files:
            if os.path.splitext(file)[1] == '.jpg':
                # filepaths.append(os.path.join(root, file))
                filenames.append(file)
    return filenames


# 测试图片数据处理与保存
def test_detectImage(files):
    imageUrls = []
    from PIL import Image
    for file in files:
        dict_value = []
        save_filename = os.path.splitext(file)[0] + '_detected.jpg'
        save_filepath = os.path.join(save_path, save_filename)
        net_filepath = os.path.join(net_path, save_filename)
        # 图片检测处理
        im = Image.open(os.path.join(orgin_path, file)).convert('L')
        im.save(save_filepath)
        # 生成处理结果数组,['name', 'src', 'result']
        dict_value = [save_filename, net_filepath, "true"]
        imageUrls.append(dict(zip(front_dict_key, dict_value)))
    # print(imageUrls)
    return imageUrls


def getDetectImages():
    orgin_filenames = getFlist(orgin_path)
    imageUrls = test_detectImage(orgin_filenames)
    return imageUrls


def result_to_database(result):

    database_dict_value = []
    detect_result = True
    orgin_filename = Path(result["path"]).name
    save_filename = Path(result["save_path"]).name
    # print(orgin_filename,save_filename)
    # if s_result
    if 'Defective weld' in result:
        detect_result = False
    # 生成处理结果数组,['name', 'src', 'result']
    now = datetime.datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")
    database_dict_value = [orgin_filename, save_filename, detect_result, date_time]
    return database_dict_value


def result_to_frontdata(result):

    front_dict_value = []
    detect_result = True
    name = Path(result["save_path"]).name
    src = str(net_path + '/' + name)
    # if s_result
    if 'Defective weld' in result:
        detect_result = False
    # 生成处理结果数组,['name', 'src', 'result']
    front_dict_value = [name, src, detect_result]
    return front_dict_value


def result_to_frontdata_and_database(results):
    ''' results[{path:'', cls1:2, cls2:1,}]
    '''
    database_data = []
    front_data = []
    for s_result in results:
        database_dict_value = result_to_database(s_result)
        database_data.append(dict(zip(database_dict_key, database_dict_value)))
        front_dict_value = result_to_frontdata(s_result)
        front_data.append(dict(zip(front_dict_key, front_dict_value)))
    return database_data, front_data


# 测试图片数据处理与保存
def detectImage(darknet):

    darknet.check_source("D:/develop/django-vue/images/correct")
    dataset = darknet.data_loader()
    results = darknet.detect(dataset=dataset)
    database_data, front_data = result_to_frontdata_and_database(results=results)
    store_data_by_model(database_data)

    return front_data


if __name__ == '__main__':
    # data = [{'filename': "0.jpg", 'detected_filename': "0_detected.jpg", 'detect_result': "false"}]
    # store_data_by_model(data)
    # current_dir = getDetectImages()
    darknet = Darknet(config_file="./yolov5_config.json")
    detectImage(darknet)
