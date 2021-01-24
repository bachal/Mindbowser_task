from django.shortcuts import render,redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from employee.serializers import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth import login, logout
from django.http import JsonResponse
from employee.models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination,LimitOffsetPagination
from rest_framework.generics import ListAPIView
from django.core.paginator import Paginator
from rest_framework import generics



# -------------------------This class used for employee CRUD operations.------------------------
class Employee_CRUD_Operations(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    
    def get(self, request,pk=None):
        id=pk
        if id is not None:
            employee=Employee.objects.get(id=id)
            serializer=Employee_Serializer(employee)
            return Response(serializer.data)

        all_employee= Employee.objects.all()
        serializer = Employee_Serializer(all_employee , many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self,request):
        serializer=Employee_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            all_employee= Employee.objects.all()
            serializer=Employee_Serializer(all_employee,many=True)
            return Response({"message":"Employee is added"}, status=status.HTTP_201_CREATED)
        return Response({"message":"Employee is not added"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        employee=Employee.objects.get(pk=pk)
        if employee:
            employee.delete() 
            all_employee= Employee.objects.all()
            serializer=Employee_Serializer(all_employee,many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'message': 'Employee record not found'}, status=status.HTTP_204_NO_CONTENT)
    
    def put(self,request,pk,format=None):
        id=pk
        employee=Employee.objects.get(id=pk)
        serializer=Employee_Serializer(employee,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Employee record update done'}, status=status.HTTP_200_OK)
        return Response({'message': 'Employee record not update'}, status=status.HTTP_204_NO_CONTENT)
    
# -------------------------This class used for employee Read operations.------------------------
class Employee_GET_Operations(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    def get(self, request,pk=None):
        id=pk
        all_employee= Employee.objects.all()
        page_number = self.request.query_params.get('page_number ', id)
        page_size = self.request.query_params.get('page_size ', 5)
        paginator = Paginator(all_employee , page_size)
        serializer = Employee_Serializer(paginator.page(page_number) , many=True, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)


# -------------------------This class used for Manager Sign up Process.------------------------
class Signup_Manager(APIView):
    def post(self, request):
        serializer=ManagersignupSerializer(data=request.data)
        if serializer.is_valid():
           serializer.save()
           return Response({'message':'User sign up Successfully!!'},status=status.HTTP_201_CREATED)
        return Response({'message':'User sign up not Done'},status=status.HTTP_400_BAD_REQUEST)


# -------------------------This class used for Manager Login Process.------------------------
class Login_Manager(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ManagerloginSerializer
    
    def post(self, request):
        serializer = ManagerloginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return Response({"msg":"logged"}, status=HTTP_200_OK)




