from django.urls import path
from employee import views
from django.views.decorators.csrf import csrf_exempt
from employee.views import *
from rest_framework_simplejwt import views as jwt_views
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Mindbowser_task API')

urlpatterns = [
    path('all_employee/', views.Employee_CRUD_Operations.as_view()),
    path('get_all_employee/<int:pk>', views.Employee_GET_Operations.as_view()),
    path('all_employee/<int:pk>/', views.Employee_CRUD_Operations.as_view()),
    path('signup/', views.Signup_Manager.as_view()),
    path('login/', views.Login_Manager.as_view()),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('my_swagger/', schema_view),
]