'''
Author: yifeng
Date: 2022-08-11 19:56:39
LastEditors: yifeng
LastEditTime: 2022-08-27 18:57:23
Description: 
'''

import os

base_path = os.getcwd()

orgin_path = os.path.join(base_path, "images/orgin")

save_path = os.path.join(base_path, "images/detected")

net_path = "http://localhost/images/detected"

database_dict_key = ['filename', 'detected_filename', 'detect_result', 'create_date_time']

front_dict_key = ['name', 'src', 'result']

config_file = "./thirdparty/yolov5_config.json"