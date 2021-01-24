
from django.contrib import admin
from django.urls import path
from django.urls import path,include
from rest_framework_simplejwt import views as jwt_views
from rest_framework_jwt.views import ObtainJSONWebToken


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('employee.urls')),
   



]
