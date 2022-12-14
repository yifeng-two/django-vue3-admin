# Django-Vue3-Admin

[![img](https://img.shields.io/badge/license-MIT-blue.svg)](https://gitee.com/liqianglog/django-vue-admin/blob/master/LICENSE)  [![img](https://img.shields.io/badge/python-%3E=3.7.x-green.svg)](https://python.org/)  [![PyPI - Django Version badge](https://img.shields.io/badge/django%20versions-3.2-blue)](https://docs.djangoproject.com/zh-hans/3.2/) [![img](https://img.shields.io/badge/node-%3E%3D%2012.0.0-brightgreen)](https://nodejs.org/zh-cn/) [![img](https://gitee.com/liqianglog/django-vue-admin/badge/star.svg?theme=dark)](https://gitee.com/liqianglog/django-vue-admin)


## å¹³å°ç®ä»

ð¡ [django-vue3-admin](https://gitee.com/yifengone/django-vue3-admin) æ¯ä¸å¥å¨é¨å¼æºçå¿«éå¼åå¹³å°ï¼æ¯«æ ä¿çç»ä¸ªäººåä¼ä¸åè´¹ä½¿ç¨ã


* ð§âð¤âð§åç«¯éç¨[Vue3](https://cn.vuejs.org/)ã[ElementPlus](https://element-plus.gitee.io/)ã[pinia](https://pinia.vuejs.org/)ã
* ð­åç«¯éç¨ Python è¯­è¨ Django æ¡æ¶ä»¥åå¼ºå¤§ç [Django REST Framework](https://pypi.org/project/djangorestframework)ã
* ð«æéè®¤è¯ä½¿ç¨[Django REST Framework SimpleJWT](https://pypi.org/project/djangorestframework-simplejwt)ï¼æ¯æå¤ç»ç«¯è®¤è¯ç³»ç»ã
* ð¬æ¯æå è½½å¨ææéèåï¼å¤æ¹å¼è½»æ¾æéæ§å¶ã
* ðç¹å«é¸£è°¢ï¼[django-vue-admin](https://gitee.com/liqianglog/django-vue-admin) ã[D2Admin](https://github.com/d2-projects/d2-admin) ã[Vue-Element-Admin](https://github.com/PanJiaChen/vue-element-admin)ã


## å¨çº¿ä½éª
* æªé¨ç½²ð©âð§âð¦



## æºç å°å

giteeå°åï¼[https://gitee.com/yifengone/django-vue3-admin](https://gitee.com/yifengone/django-vue3-admin)ð©âð¦âð¦

githubå°åï¼[https://github.com/yifeng-two/django-vue3-admin](https://github.com/yifeng-two/django-vue3-admin)ð©âð¦âð¦



## åç½®åè½

1.  ð¨ââï¸èåç®¡çï¼éç½®ç³»ç»èåï¼æä½æéï¼æé®æéæ è¯ãåç«¯æ¥å£æéç­ã
2.  ð§ââï¸é¨é¨ç®¡çï¼éç½®ç³»ç»ç»ç»æºæï¼å¬å¸ãé¨é¨ãè§è²ï¼ã
3.  ð©ââï¸è§è²ç®¡çï¼è§è²èåæéåéãæ°æ®æéåéãè®¾ç½®è§è²æé¨é¨è¿è¡æ°æ®èå´æéååã
4.  ð§âðæéæéï¼ææè§è²çæéèå´ã
5.  ð¨âðç¨æ·ç®¡çï¼ç¨æ·æ¯ç³»ç»æä½èï¼è¯¥åè½ä¸»è¦å®æç³»ç»ç¨æ·éç½®ã
6.  ð¬æ¥å£ç½ååï¼éç½®ä¸éè¦è¿è¡æéæ ¡éªçæ¥å£ã
7.  ð§âð§å­å¸ç®¡çï¼å¯¹ç³»ç»ä¸­ç»å¸¸ä½¿ç¨çä¸äºè¾ä¸ºåºå®çæ°æ®è¿è¡ç»´æ¤ã
8.  ð§âð§å°åºç®¡çï¼å¯¹çå¸å¿åºåè¿è¡ç®¡çã
9.  ðéä»¶ç®¡çï¼å¯¹å¹³å°ä¸æææä»¶ãå¾çç­è¿è¡ç»ä¸ç®¡çã
10.  ðï¸æä½æ¥å¿ï¼ç³»ç»æ­£å¸¸æä½æ¥å¿è®°å½åæ¥è¯¢ï¼ç³»ç»å¼å¸¸ä¿¡æ¯æ¥å¿è®°å½åæ¥è¯¢ã


## åå¤å·¥ä½
~~~
Python >= 3.7.1 (æ¨è3.7+çæ¬)
nodejs >= 14.0 (æ¨èææ°)
Mysql >= 5.7.0 (å¯éï¼é»è®¤æ°æ®åºsqlite3ï¼æ¨è8.0çæ¬)
Redis(å¯éï¼ææ°ç)
~~~

## åç«¯â

```bash
# åéé¡¹ç®
git clone https://github.com/yifeng-two/django-vue3-admin.git

# è¿å¥é¡¹ç®ç®å½
cd fronted

# å®è£ä¾èµ
npm install --registry=https://registry.npm.taobao.org

# å¯å¨æå¡
npm run dev
# æµè§å¨è®¿é® http://localhost:8080
# .env.development æä»¶ä¸­å¯éç½®å¯å¨ç«¯å£ç­åæ°
# æå»ºçäº§ç¯å¢
# npm run build
```



## åç«¯ð

~~~bash
1. è¿å¥é¡¹ç®ç®å½ cd backend
2. å¨é¡¹ç®æ ¹ç®å½ä¸­ï¼å¤å¶ ./conf/env.example.py æä»¶ä¸ºä¸ä»½æ°çå° ./conf æä»¶å¤¹ä¸ï¼å¹¶éå½åä¸º env.py
3. å¨ env.py ä¸­éç½®æ°æ®åºä¿¡æ¯
	mysqlæ°æ®åºçæ¬å»ºè®®ï¼8.0
	mysqlæ°æ®åºå­ç¬¦éï¼utf8mb4
4. å®è£ä¾èµç¯å¢
	pip3 install -r requirements.txt
5. æ§è¡è¿ç§»å½ä»¤ï¼
	python3 manage.py makemigrations
	python3 manage.py migrate
6. åå§åæ°æ®
	python3 manage.py init
7. åå§åçå¸å¿æ°æ®:
	python3 manage.py init_area
8. å¯å¨é¡¹ç®
	python3 manage.py runserver 0.0.0.0:8000
æä½¿ç¨ daphne :
  daphne -b 0.0.0.0 -p 8000 application.asgi:application
~~~

### è®¿é®é¡¹ç®

- è®¿é®å°åï¼[http://localhost:8080](http://localhost:8080) (é»è®¤ä¸ºæ­¤å°åï¼å¦æä¿®æ¹è¯·æç§éç½®æä»¶)
- è´¦å·ï¼`superadmin` å¯ç ï¼`admin123456`



### docker-compose è¿è¡
- å°æªæ·»å docker

~~~shell
# åå®è£docker-compose (èªè¡ç¾åº¦å®è£),æ§è¡æ­¤å½ä»¤ç­å¾å®è£ï¼å¦æä½¿ç¨celeryæä»¶è¯·æå¼docker-compose.ymlä¸­celery é¨åæ³¨é
docker-compose up -d
# åå§ååç«¯æ°æ®(ç¬¬ä¸æ¬¡æ§è¡å³å¯)
docker exec -ti dvadmin-django bash
python manage.py makemigrations 
python manage.py migrate
python manage.py init_area
python manage.py init
exit

åç«¯å°åï¼http://127.0.0.1:8080
åç«¯å°åï¼http://127.0.0.1:8080/api
# å¨æå¡å¨ä¸è¯·æ127.0.0.1 æ¢æèªå·±å¬ç½ip
è´¦å·ï¼superadmin å¯ç ï¼admin123456

# docker-compose åæ­¢
docker-compose down
#  docker-compose éå¯
docker-compose restart
#  docker-compose å¯å¨æ¶éæ°è¿è¡ build
docker-compose up -d --build
~~~

### æèµ æ¯æ

- äºç»´ç 

![image-01](./images/äºç»´ç .png)



