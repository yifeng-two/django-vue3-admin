from django.http import HttpResponse, JsonResponse
from thirdparty.detect import getDetectImages

# Create your views here.
def welcome(request):
    return HttpResponse("<h1>Welcome to my tiny twitter!</h1>")

#region
# def showImage(request):

#     imageUrls = [{
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
#     return JsonResponse(imageUrls, safe=False)
#endregion

def showImage(request):

    imageUrls = getDetectImages()
    return JsonResponse(imageUrls, safe=False)
