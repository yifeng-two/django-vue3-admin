'''
Author: yifeng
Date: 2022-08-14 16:53:37
LastEditors: yifeng
LastEditTime: 2022-08-27 23:24:13
Description: 
'''
import json
from channels.generic.websocket import WebsocketConsumer
from channels.exceptions import StopConsumer
from thirdparty.detect import detectImage
from apps.detect.result import store_data_by_model
from yolov5.yolov5 import Darknet
from thirdparty.config import config_file

#region
# imageUrls = [{
#         'id': 1,
#         'name': "0.jpg",
#         'src': "http://localhost/images/orgin/1.jpg",
#         'result': "false"
#     }, {
#         'id': 4,
#         'name': "8.jpg",
#         'src': "http://localhost/images/orgin/4.jpg",
#         'result': "true"
#     }, {
#         'id': 6,
#         'name': "8.jpg",
#         'src': "http://localhost/images/orgin/6.jpg",
#         'result': "false"
#     }, {
#         'id': 8,
#         'name': "8.jpg",
#         'src': "http://localhost/images/orgin/8.jpg",
#         'result': "true"
#     }]
#endregion


class SendResultConsumer(WebsocketConsumer):
    # 当Websocket创建连接时
    def websocket_connect(self, event):
        print("已连接")
        self.accept()
        # 数据处理
        darknet = Darknet(config_file=config_file)
        # for i in range(2):
        imageUrls = detectImage(darknet)
        self.send(json.dumps(imageUrls))
        # time.sleep(2)

    # 当Websocket接收到消息时
    def websocket_receive(self, text_data=None, bytes_data=None):
        print("已收到消息")

    # 当Websocket发生断开连接时
    def websocket_disconnect(self, code):
        print("已断开")
        raise StopConsumer()